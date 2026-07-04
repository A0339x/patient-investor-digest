/* =============================================================================
 * "For the Group" — in-Digest discussion widget.
 *
 * Turns each story's spark and the weekly closing into a live conversation:
 * a signed-in member sees the group's recent answers inline and can reply right
 * here. Their answer posts to the social platform's #digest-discussion channel,
 * threaded under that prompt, authored under their real member name — no extra
 * login (identity rides the digest session cookie).
 *
 * Gating: renders ONLY for signed-in members (GET /api/session). Public readers
 * see nothing for now. (At launch, swap the silent return for a "Sign in to
 * answer" CTA — see memory patient-investor-digest-group.)
 *
 * Flow per prompt element (.story-spark / .issue-closing, tagged with
 * data-digest + data-story by buildIssues):
 *   - read prompt text + context from the DOM (before injecting anything),
 *   - render the answer box immediately,
 *   - lazy-load recent answers when the widget scrolls into view,
 *   - POST /api/group-reply on submit and prepend the new answer.
 *
 * All network calls go through same-origin Pages Functions that relay the
 * HttpOnly session cookie as a Bearer token to the social app.
 * ============================================================================= */
(function () {
  "use strict";

  var CLOSING_INDEX = "-1";
  var state = { name: null, socialUrl: "" };

  function h(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text; // textContent = XSS-safe
    return el;
  }

  function relTime(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "";
    var s = Math.max(0, Math.floor((Date.now() - then) / 1000));
    if (s < 60) return "just now";
    var m = Math.floor(s / 60);
    if (m < 60) return m + "m";
    var hrs = Math.floor(m / 60);
    if (hrs < 24) return hrs + "h";
    var d = Math.floor(hrs / 24);
    if (d < 7) return d + "d";
    return new Date(then).toLocaleDateString();
  }

  function injectStyles() {
    if (document.getElementById("pi-group-styles")) return;
    var css =
      ".group-widget{margin-top:14px;border-top:1px solid rgba(201,168,76,.18);padding-top:14px}" +
      ".group-answers{display:flex;flex-direction:column;gap:10px;margin-bottom:12px}" +
      ".group-empty{font-size:.8rem;color:#8a857a;font-style:italic}" +
      ".group-answer{background:#14110B;border:1px solid rgba(201,168,76,.12);border-radius:8px;padding:8px 11px}" +
      ".group-answer.ga-you{border-color:rgba(201,168,76,.4)}" +
      ".ga-head{display:flex;align-items:baseline;gap:8px;margin-bottom:3px}" +
      ".ga-name{font-size:.8rem;font-weight:600;color:#C9A84C}" +
      ".ga-time{font-size:.68rem;color:#7d7869}" +
      ".ga-body{font-size:.82rem;color:#D8D4CC;line-height:1.6;white-space:pre-wrap}" +
      ".group-more{display:inline-block;margin-top:2px;font-size:.72rem;color:#C9A84C;text-decoration:none;opacity:.85}" +
      ".group-more:hover{opacity:1;text-decoration:underline}" +
      ".group-form{display:flex;flex-direction:column;gap:8px}" +
      ".group-input{width:100%;box-sizing:border-box;resize:vertical;min-height:44px;background:#0E0C08;color:#E8E8E4;border:1px solid rgba(201,168,76,.22);border-radius:8px;padding:9px 11px;font:inherit;font-size:.82rem;line-height:1.5}" +
      ".group-input:focus{outline:none;border-color:rgba(201,168,76,.55)}" +
      ".group-input::placeholder{color:#6f6a5d}" +
      ".group-actions{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}" +
      ".group-hint{font-size:.7rem;color:#7d7869}" +
      ".group-hint b{color:#a99a6a;font-weight:600}" +
      ".group-submit{background:#C9A84C;color:#1F1B16;border:0;border-radius:7px;padding:7px 14px;font:inherit;font-size:.78rem;font-weight:600;cursor:pointer}" +
      ".group-submit:disabled{opacity:.5;cursor:default}" +
      ".group-error{font-size:.74rem;color:#d98a6a}";
    var style = h("style");
    style.id = "pi-group-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function renderAnswers(listEl, moreSlot, data, contextEl) {
    listEl.innerHTML = "";
    var answers = (data && data.answers) || [];
    if (!answers.length) {
      listEl.appendChild(
        h("div", "group-empty", "No answers yet — be the first to weigh in."),
      );
      return;
    }
    answers.forEach(function (a) {
      var card = h("div", "group-answer" + (a.is_you ? " ga-you" : ""));
      var head = h("div", "ga-head");
      head.appendChild(h("span", "ga-name", a.is_you ? "You" : a.name));
      head.appendChild(h("span", "ga-time", relTime(a.created_at)));
      card.appendChild(head);
      card.appendChild(h("div", "ga-body", a.body));
      listEl.appendChild(card);
    });
    // "See all N in the community" when there are more than the preview shows.
    moreSlot.innerHTML = "";
    var total = data.total || answers.length;
    if (total > answers.length && state.socialUrl) {
      var link = h("a", "group-more", "See all " + total + " in the community →");
      link.href = state.socialUrl + "/channels/digest-discussion";
      link.target = "_blank";
      link.rel = "noopener";
      moreSlot.appendChild(link);
    }
  }

  function buildWidget(promptEl) {
    var digestId = promptEl.dataset.digest;
    var storyIndex = promptEl.dataset.story;
    if (!digestId || storyIndex == null) return;

    // Read prompt + context BEFORE we inject anything into the element.
    var isClosing = storyIndex === CLOSING_INDEX;
    var promptText = isClosing
      ? promptEl.textContent.trim()
      : (promptEl.querySelector(".spark-text")
          ? promptEl.querySelector(".spark-text").textContent.trim()
          : promptEl.textContent.trim());
    var issue = promptEl.closest(".issue");
    var digestTitle =
      (issue && issue.querySelector(".issue-date")
        ? issue.querySelector(".issue-date").textContent.trim()
        : digestId);
    var contextLabel = isClosing
      ? "This week's closing question"
      : (function () {
          var story = promptEl.closest(".story");
          var t = story && story.querySelector(".story-title");
          return t ? t.textContent.trim().slice(0, 200) : "Story " + (Number(storyIndex) + 1);
        })();

    var widget = h("div", "group-widget");
    var list = h("div", "group-answers");
    list.appendChild(h("div", "group-empty", "Loading the group…"));
    var moreSlot = h("div");
    var form = document.createElement("form");
    form.className = "group-form";
    var input = document.createElement("textarea");
    input.className = "group-input";
    input.rows = 2;
    input.maxLength = 4000;
    input.placeholder = "Share how you'd apply the variables here…";
    var actions = h("div", "group-actions");
    var hint = h("div", "group-hint");
    hint.innerHTML = "Posts to the group as <b></b>";
    hint.querySelector("b").textContent = state.name || "you";
    var submit = h("button", "group-submit", "Post to the group →");
    submit.type = "submit";
    actions.appendChild(hint);
    actions.appendChild(submit);
    var errBox = h("div", "group-error");
    errBox.hidden = true;
    form.appendChild(input);
    form.appendChild(actions);
    form.appendChild(errBox);
    widget.appendChild(list);
    widget.appendChild(moreSlot);
    widget.appendChild(form);
    promptEl.appendChild(widget);

    var answersUrl =
      "/api/group-answers?digestId=" +
      encodeURIComponent(digestId) +
      "&storyIndex=" +
      encodeURIComponent(storyIndex);

    function loadAnswers() {
      fetch(answersUrl, { credentials: "same-origin" })
        .then(function (r) { return r.json(); })
        .then(function (data) { renderAnswers(list, moreSlot, data, promptEl); })
        .catch(function () {
          list.innerHTML = "";
          list.appendChild(h("div", "group-empty", "Couldn't load answers."));
        });
    }

    // Lazy-load answers when the widget scrolls into view (there can be dozens
    // of prompts across all issues — don't fetch them all on page load).
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            io.disconnect();
            loadAnswers();
          }
        });
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(widget);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var body = input.value.trim();
      errBox.hidden = true;
      if (!body) return;
      submit.disabled = true;
      submit.textContent = "Posting…";
      fetch("/api/group-reply", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          digestId: digestId,
          storyIndex: Number(storyIndex),
          digestTitle: digestTitle,
          contextLabel: contextLabel,
          promptText: promptText.slice(0, 2000),
          body: body,
        }),
      })
        .then(function (r) {
          return r.json().then(function (d) { return { ok: r.ok, d: d }; });
        })
        .then(function (res) {
          if (!res.ok || !res.d || !res.d.ok) {
            throw new Error((res.d && res.d.error) || "post_failed");
          }
          input.value = "";
          // Drop the "no answers yet" placeholder if present, then append.
          var empty = list.querySelector(".group-empty");
          if (empty) list.innerHTML = "";
          var a = res.d.answer;
          var card = h("div", "group-answer ga-you");
          var head = h("div", "ga-head");
          head.appendChild(h("span", "ga-name", "You"));
          head.appendChild(h("span", "ga-time", relTime(a.created_at)));
          card.appendChild(head);
          card.appendChild(h("div", "ga-body", a.body));
          list.appendChild(card);
        })
        .catch(function () {
          errBox.hidden = false;
          errBox.textContent = "Couldn't post that. Try again in a moment.";
        })
        .finally(function () {
          submit.disabled = false;
          submit.textContent = "Post to the group →";
        });
    });
  }

  function hydrateAll() {
    var prompts = document.querySelectorAll(
      ".story-spark[data-digest], .issue-closing[data-digest]",
    );
    prompts.forEach(buildWidget);
  }

  window.PIGroup = {
    init: function () {
      fetch("/api/session", { credentials: "same-origin" })
        .then(function (r) { return r.json(); })
        .then(function (s) {
          state.socialUrl = (s && s.socialUrl) || "";
          if (!s || !s.signedIn) return; // public readers: hidden for now
          state.name = s.name || "you";
          injectStyles();
          hydrateAll();
        })
        .catch(function () { /* offline / not signed in — show nothing */ });
    },
  };
})();
