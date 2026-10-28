/* Deep Patel — v3 behaviour
   sidebar toggle · reveal · lightbox · accent themes · command palette
   · interactive terminal · project outline highlighting            */
(function () {
  "use strict";

  var EMAIL = "deepkalpana1@aol.com";
  var PAGES = [
    ["index.html", "Home", "overview"],
    ["achievements.html", "Achievements", "degrees & certifications"],
    ["schedulerx.html", "SchedulerX", "React Native lifestyle app · Fall 2023 — Spring 2024"],
    ["ai.html", "Artificial Intelligence Project", "binary classification on images · Fall 2023"],
    ["blackjack.html", "Blackjack", "C# .NET console card game · Summer 2024"],
    ["camp-system.html", "Software Engineering Camp System Project", "console summer camp system · Fall 2022"],
    ["fantasy-rescue.html", "Fantasy Rescue", "3D Unity game · Fall 2020"],
    ["580project.html", "Game Design Project", "Unity key-hunt game · Spring 2019"]
  ];
  var PROJECTS = PAGES.slice(2);
  var EXT = {
    github: "https://github.com/DeepThePatel",
    linkedin: "https://www.linkedin.com/in/deep-patel-a867a3170/",
    instagram: "https://www.instagram.com/dc4.deep/"
  };
  var THEMES = { teal: "#64ffda", amber: "#ffb454", violet: "#b79cff", rose: "#ff7a9c" };

  function resumeHref() {
    var b = document.querySelector(".side-foot .btn");
    return b ? b.getAttribute("href") : "Resume_DeepPatel.pdf";
  }
  function go(href) { window.location.href = href; }
  function ext(url) { window.open(url, "_blank", "noopener"); }

  /* ---------------------------------------------------------- themes */
  function setTheme(name) {
    if (!THEMES[name]) return false;
    if (name === "teal") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", name);
    try { localStorage.setItem("dp-theme", name); } catch (e) {}
    document.querySelectorAll(".themes button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.theme === name ? "true" : "false");
    });
    return true;
  }
  var current = "teal";
  try { current = localStorage.getItem("dp-theme") || "teal"; } catch (e) {}
  document.querySelectorAll(".themes button").forEach(function (b) {
    b.addEventListener("click", function () { setTheme(b.dataset.theme); });
  });
  setTheme(THEMES[current] ? current : "teal");

  /* ----------------------------------------------------- sidebar toggle */
  var toggle = document.querySelector(".nav-toggle:not(.open-palette)");
  var side = document.querySelector(".side");
  if (toggle && side) {
    toggle.addEventListener("click", function () {
      var open = side.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    side.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { side.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* -------------------------------------------------------------- reveal */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -30px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ------------------------------------------------------ outline rail */
  var links = document.querySelectorAll(".outline a");
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var l = map[en.target.id];
          if (l) l.classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    document.querySelectorAll(".block[id]").forEach(function (s) { so.observe(s); });
  }

  /* ------------------------------------------------------------ lightbox */
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Enlarged image");
  box.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(box);
  var boxImg = box.querySelector("img");
  function closeBox() { box.classList.remove("open"); document.body.style.overflow = ""; }
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.matches && t.matches("img[data-zoom]")) {
      boxImg.src = t.currentSrc || t.src;
      boxImg.alt = t.alt || "";
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    } else if (box.classList.contains("open") && (t === box || t.tagName === "BUTTON")) {
      closeBox();
    }
  });

  /* ------------------------------------------------------ command palette */
  var pal = null, palInput, palList, palItems = [], palSel = 0;

  function buildActions() {
    var a = [];
    PAGES.forEach(function (p) {
      a.push({ g: "Pages", label: p[1], hint: p[2], run: function () { go(p[0]); } });
    });
    [["About", "about"], ["Work experience", "experience"], ["Projects", "work"]].forEach(function (s) {
      a.push({ g: "Sections", label: s[0], hint: "index.html#" + s[1], run: function () { go("index.html#" + s[1]); } });
    });
    a.push({ g: "Links", label: "Resume", hint: "PDF", run: function () { go(resumeHref()); } });
    a.push({ g: "Links", label: "GitHub", hint: "github.com/DeepThePatel", run: function () { ext(EXT.github); } });
    a.push({ g: "Links", label: "LinkedIn", hint: "linkedin.com", run: function () { ext(EXT.linkedin); } });
    a.push({ g: "Links", label: "Instagram", hint: "instagram.com", run: function () { ext(EXT.instagram); } });
    a.push({ g: "Links", label: "Email", hint: EMAIL, run: function () { go("mailto:" + EMAIL); } });
    Object.keys(THEMES).forEach(function (t) {
      a.push({ g: "Accent color", label: "Theme: " + t, hint: THEMES[t], run: function () { setTheme(t); } });
    });
    return a;
  }

  function renderPal(q) {
    q = (q || "").toLowerCase().trim();
    var all = buildActions();
    palItems = all.filter(function (x) {
      return !q || (x.label + " " + x.hint + " " + x.g).toLowerCase().indexOf(q) !== -1;
    });
    palSel = 0;
    palList.innerHTML = "";
    var lastG = "";
    palItems.forEach(function (x, i) {
      if (x.g !== lastG) {
        var h = document.createElement("li");
        h.className = "pal-g"; h.textContent = x.g; palList.appendChild(h);
        lastG = x.g;
      }
      var li = document.createElement("li");
      li.className = "pal-i" + (i === 0 ? " sel" : "");
      li.setAttribute("role", "option");
      var s = document.createElement("span"); s.textContent = x.label;
      var m = document.createElement("small"); m.textContent = x.hint;
      li.appendChild(s); li.appendChild(m);
      li.addEventListener("click", function () { runPal(i); });
      li.addEventListener("mousemove", function () { selPal(i, true); });
      palList.appendChild(li);
    });
    if (!palItems.length) {
      var e = document.createElement("li"); e.className = "pal-g"; e.textContent = "No matches"; palList.appendChild(e);
    }
  }
  function selPal(i, noScroll) {
    var els = palList.querySelectorAll(".pal-i");
    if (!els.length) return;
    palSel = (i + els.length) % els.length;
    els.forEach(function (el, k) { el.classList.toggle("sel", k === palSel); });
    if (!noScroll) els[palSel].scrollIntoView({ block: "nearest" });
  }
  function runPal(i) {
    var x = palItems[i];
    closePal();
    if (x) x.run();
  }
  function openPal() {
    if (!pal) {
      pal = document.createElement("div");
      pal.className = "pal";
      pal.setAttribute("role", "dialog");
      pal.setAttribute("aria-modal", "true");
      pal.setAttribute("aria-label", "Command palette");
      pal.innerHTML = '<div class="pal-box"><input class="pal-in" type="text" autocomplete="off" spellcheck="false" placeholder="Go to a page, open a link, change theme…" aria-label="Search commands"><ul class="pal-list" role="listbox"></ul><div class="pal-foot"><span>↑↓ navigate</span><span>↵ select</span><span>esc close</span></div></div>';
      document.body.appendChild(pal);
      palInput = pal.querySelector(".pal-in");
      palList = pal.querySelector(".pal-list");
      palInput.addEventListener("input", function () { renderPal(palInput.value); });
      palInput.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") { e.preventDefault(); selPal(palSel + 1); }
        else if (e.key === "ArrowUp") { e.preventDefault(); selPal(palSel - 1); }
        else if (e.key === "Enter") { e.preventDefault(); runPal(palSel); }
      });
      pal.addEventListener("mousedown", function (e) { if (e.target === pal) closePal(); });
    }
    palInput.value = "";
    renderPal("");
    pal.classList.add("open");
    palInput.focus();
  }
  function closePal() { if (pal) pal.classList.remove("open"); }

  document.querySelectorAll(".open-palette").forEach(function (b) {
    b.addEventListener("click", function () {
      if (side) side.classList.remove("open");
      openPal();
    });
  });
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (pal && pal.classList.contains("open")) closePal(); else openPal();
    } else if (e.key === "Escape") {
      closePal(); closeBox();
    }
  });

  /* ------------------------------------------------- experience accordion */
  document.querySelectorAll(".exp-toggle").forEach(function (btn) {
    var body = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (body) body.classList.toggle("open", open);
    });
  });

  /* ------------------------------------------------------- typing intro */
  var termBody = document.querySelector(".hero .term-body");
  if (termBody && !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    var steps = Array.prototype.slice.call(termBody.querySelectorAll(":scope > [style*='--i']"));
    termBody.classList.add("typing");
    steps.forEach(function (el) { el.classList.add("pending"); });

    var typeInto = function (el, node, text, delay, done) {
      var n = 0;
      node.textContent = "";
      el.classList.add("typing-now");
      (function tick() {
        n++;
        node.textContent = text.slice(0, n);
        if (n < text.length) setTimeout(tick, delay + Math.random() * delay * 0.6);
        else { el.classList.remove("typing-now"); done(); }
      })();
    };
    var runStep = function (i) {
      if (i >= steps.length) return;
      var el = steps[i];
      var next = function () { setTimeout(function () { runStep(i + 1); }, 260); };
      el.classList.remove("pending");
      var cmdNode = el.querySelector(".cmd");
      if (cmdNode && !el.matches(".inline")) {
        typeInto(el, cmdNode, cmdNode.textContent, 55, next);
      } else if (!el.children.length && el.textContent.length) {
        typeInto(el, el, el.textContent, 16, next);
      } else {
        next();
      }
    };
    setTimeout(function () { runStep(0); }, 400);
  }

  /* ----------------------------------------------------- interactive terminal */
  var input = document.getElementById("cmd");
  var out = document.getElementById("termout");
  if (input && out) {
    var history = [], hi = 0;

    var line = function (text, cls) {
      var p = document.createElement("p");
      p.className = "o" + (cls ? " " + cls : "");
      p.textContent = text;
      out.appendChild(p);
      return p;
    };
    var linkLine = function (prefix, label, href, external) {
      var p = document.createElement("p");
      p.className = "o";
      if (prefix) p.appendChild(document.createTextNode(prefix));
      var a = document.createElement("a");
      a.textContent = label;
      a.href = href;
      if (external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      p.appendChild(a);
      out.appendChild(p);
    };
    var listProjects = function () {
      PROJECTS.forEach(function (p, i) { linkLine((i + 1) + "  ", p[1], p[0], false); });
    };
    var find = function (q) {
      q = q.toLowerCase().trim();
      if (!q) return null;
      if (/^[1-6]$/.test(q)) return PROJECTS[Number(q) - 1];
      var pool = PAGES;
      for (var i = 0; i < pool.length; i++) {
        if (pool[i][0].toLowerCase().indexOf(q) !== -1 || pool[i][1].toLowerCase().indexOf(q) !== -1) return pool[i];
      }
      return null;
    };
    var scrollTo = function (id) {
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    var COMMANDS = {
      help: function () {
        [
          "help                 show this list",
          "whoami               who I am",
          "ls | projects        list projects",
          "open <name|number>   open a project or page (try: open 3)",
          "about | experience   jump to a section",
          "achievements         open certifications",
          "contact              email address",
          "github | linkedin | instagram",
          "resume               open my resume",
          "theme <teal|amber|violet|rose>",
          "clear                clear the screen"
        ].forEach(function (t) { line(t); });
        line("tip: Ctrl+K opens the command palette anywhere.", "dim");
      },
      whoami: function () { line("Deep Patel — Systems Developer / Programmer II"); },
      ls: function () { listProjects(); },
      projects: function () { listProjects(); },
      open: function (arg) {
        var hit = find(arg);
        if (!hit) { line("open: nothing matches '" + arg + "'. Try 'ls'.", "err"); return; }
        line("opening " + hit[0] + " …", "dim");
        setTimeout(function () { go(hit[0]); }, 250);
      },
      about: function () { line("scrolling to about …", "dim"); scrollTo("about"); },
      experience: function () { line("scrolling to experience …", "dim"); scrollTo("experience"); },
      work: function () { COMMANDS.ls(); },
      achievements: function () { line("opening achievements.html …", "dim"); setTimeout(function () { go("achievements.html"); }, 250); },
      contact: function () { linkLine("email  ", EMAIL, "mailto:" + EMAIL, false); },
      email: function () { COMMANDS.contact(); },
      github: function () { linkLine("", EXT.github, EXT.github, true); ext(EXT.github); },
      linkedin: function () { linkLine("", EXT.linkedin, EXT.linkedin, true); ext(EXT.linkedin); },
      instagram: function () { linkLine("", EXT.instagram, EXT.instagram, true); ext(EXT.instagram); },
      resume: function () { line("opening resume …", "dim"); setTimeout(function () { go(resumeHref()); }, 250); },
      theme: function (arg) {
        if (!setTheme((arg || "").toLowerCase())) line("theme: choose one of teal, amber, violet, rose", "err");
        else line("accent set to " + arg.toLowerCase(), "dim");
      },
      clear: function () { out.innerHTML = ""; }
    };

    var exec = function (raw) {
      var cmd = raw.trim();
      if (!cmd) return;
      history.push(cmd); hi = history.length;
      if (cmd !== "clear") line("$ " + cmd, "echo");
      var parts = cmd.split(/\s+/);
      var name = parts[0].toLowerCase();
      var arg = parts.slice(1).join(" ");
      if (Object.prototype.hasOwnProperty.call(COMMANDS, name)) COMMANDS[name](arg);
      else line("command not found: " + name + " — type 'help'", "err");
      var t = input.closest(".term-body");
      if (t) t.scrollTop = t.scrollHeight;
    };

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { exec(input.value); input.value = ""; }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) { hi--; input.value = history[hi]; } }
      else if (e.key === "ArrowDown") { e.preventDefault(); if (hi < history.length - 1) { hi++; input.value = history[hi]; } else { hi = history.length; input.value = ""; } }
    });
    var body = input.closest(".term-body");
    if (body) body.addEventListener("click", function (e) {
      if (!window.getSelection || String(window.getSelection()) === "") input.focus({ preventScroll: true });
    });
  }
})();
