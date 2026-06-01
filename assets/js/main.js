/* =====================================================================
   MCSA 官网 · 交互与共享组件注入
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- 外部链接（微信公众号文章等） ---------- */
  var WX = {
    about:     "https://mp.weixin.qq.com/s/iwZ6iQmSYEKsLwxpcmI8IQ",
    campus:    "https://mp.weixin.qq.com/s/PG0ixTivOyW8INnQl2IJWw",
    secretary: "https://mp.weixin.qq.com/s/V22HC5mXqJecu1XLrpOIjQ",
    pr:        "https://mp.weixin.qq.com/s/oLYaI0RcCws4XZkVtpz2dg",
    org:       "https://mp.weixin.qq.com/s/n2mw6lC1p2BOLqUAQ_gdYg",
    market:    "https://mp.weixin.qq.com/s/oz4QwVgdC7N96_HuerOqjQ",
    alumni:    "https://mp.weixin.qq.com/s/V8_BgbBv87uxFz3bLpQYZg",
    discount:  "https://mp.weixin.qq.com/s/nzF7IX3RHH8CFlJVbuznXg",
    facebook:  "https://www.facebook.com/monashcsa/",
    instagram: "https://www.instagram.com/monashcsa/"
  };

  var EXT = '<svg class="ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M7 17L17 7M9 7h8v8"/></svg>';
  var CARET = '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg>';

  /* ---------- 导航数据 ---------- */
  var NAV = [
    { id: "home", label: "首页", href: "index.html" },
    { id: "about", label: "关于我们", href: "index.html#about", children: [
      { label: "学生会简介", href: "index.html#about" },
      { label: "部门介绍",   href: "departments.html" },
      { label: "历届主席",   href: "presidents.html" },
      { label: "关于我们 · 公众号", href: WX.about, ext: true }
    ]},
    { id: "news", label: "活动资讯", href: "activities.html", children: [
      { label: "最新活动", href: "activities.html" },
      { label: "往期回顾", href: "reviews.html" },
      { label: "校园资讯 · 公众号", href: WX.campus, ext: true }
    ]},
    { id: "join", label: "加入我们", href: "join.html", children: [
      { label: "新生指南", href: "guide.html" },
      { label: "干事招新", href: "join.html" },
      { label: "秘书部", href: WX.secretary, ext: true },
      { label: "宣传部", href: WX.pr, ext: true },
      { label: "组织部", href: WX.org, ext: true },
      { label: "市场部", href: WX.market, ext: true },
      { label: "校友会", href: WX.alumni, ext: true },
      { label: "文体部", href: "join.html" }
    ]},
    { id: "partner", label: "合作伙伴", href: "sponsors.html", children: [
      { label: "年度赞助", href: "sponsors.html" },
      { label: "折扣商家 · 公众号", href: WX.discount, ext: true }
    ]}
  ];

  /* active 映射：当前页 -> 高亮的顶级菜单 */
  var ACTIVE_MAP = {
    home: "home",
    departments: "about", presidents: "about",
    activities: "news", reviews: "news",
    join: "join", guide: "join",
    sponsors: "partner"
  };

  var page = document.body.getAttribute("data-page") || "home";
  var activeTop = ACTIVE_MAP[page] || "";

  /* ---------- 渲染 Header ---------- */
  function buildNav() {
    return NAV.map(function (item) {
      var cls = item.id === activeTop ? ' class="active"' : "";
      if (item.children) {
        var sub = item.children.map(function (c) {
          return '<a href="' + c.href + '"' + (c.ext ? ' target="_blank" rel="noopener"' : "") + '>' +
                 '<span>' + c.label + '</span>' + (c.ext ? EXT : "") + "</a>";
        }).join("");
        return '<li' + cls + '><a href="' + item.href + '">' + item.label + CARET + "</a>" +
               '<div class="dropdown">' + sub + "</div></li>";
      }
      return '<li' + cls + '><a href="' + item.href + '">' + item.label + "</a></li>";
    }).join("");
  }

  function headerHTML() {
    return '' +
      '<div class="container container-wide">' +
        '<a class="brand" href="index.html" aria-label="MCSA 蒙纳士大学中国学生会">' +
          '<img src="images/mcsa_logo.png" alt="MCSA Logo">' +
          '<span class="brand-text">' +
            '<span class="cn">蒙纳士中国学生会</span>' +
            '<span class="en">Monash Chinese Student Assoc.</span>' +
          '</span>' +
        '</a>' +
        '<nav aria-label="主导航"><ul class="nav">' + buildNav() + '</ul></nav>' +
        '<div class="header-cta">' +
          '<a class="btn btn-outline" href="guide.html">新生指南</a>' +
          '<a class="btn btn-primary" href="join.html">加入 MCSA</a>' +
        '</div>' +
        '<button class="nav-toggle" aria-label="菜单" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '</div>';
  }

  function mobileHTML() {
    var groups = NAV.map(function (item) {
      if (item.children) {
        var sub = item.children.map(function (c) {
          return '<a href="' + c.href + '"' + (c.ext ? ' target="_blank" rel="noopener"' : "") + '>' + c.label + (c.ext ? EXT : "") + "</a>";
        }).join("");
        return '<div class="m-group"><button class="m-parent">' + item.label + CARET + '</button><div class="m-sub">' + sub + "</div></div>";
      }
      return '<div class="m-group"><a class="m-link" href="' + item.href + '">' + item.label + "</a></div>";
    }).join("");
    return groups + '<div class="m-cta"><a class="btn btn-primary" href="join.html">加入 MCSA</a></div>';
  }

  /* ---------- 渲染 Footer ---------- */
  function footerHTML() {
    return '' +
    '<div class="container">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<div class="logo"><img src="images/mcsa_logo.png" alt="MCSA"><b>蒙纳士中国学生会</b></div>' +
          '<p>蒙纳士中国学生会（MCSA）成立于 2000 年，是经蒙纳士大学认证、中国驻墨尔本总领馆教育处指导的学生社团，致力于成为中国留学生在澳学习生活的互助平台。</p>' +
          '<div class="footer-social">' +
            '<a href="' + WX.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.instagram + '</a>' +
            '<a href="' + WX.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICON.facebook + '</a>' +
            '<a href="index.html#connect" aria-label="微信公众号">' + ICON.wechat + '</a>' +
            '<a href="index.html#connect" aria-label="微博">' + ICON.weibo + '</a>' +
            '<a href="index.html#connect" aria-label="抖音">' + ICON.douyin + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h5>了解 MCSA</h5>' +
          '<ul>' +
            '<li><a href="index.html#about">学生会简介</a></li>' +
            '<li><a href="departments.html">部门介绍</a></li>' +
            '<li><a href="presidents.html">历届主席</a></li>' +
            '<li><a href="sponsors.html">年度赞助</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h5>活动 · 加入</h5>' +
          '<ul>' +
            '<li><a href="activities.html">最新活动</a></li>' +
            '<li><a href="reviews.html">往期回顾</a></li>' +
            '<li><a href="guide.html">新生指南</a></li>' +
            '<li><a href="join.html">干事招新</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col footer-contact">' +
          '<h5>联系我们</h5>' +
          '<div class="item">' + ICON.wechat + '<span><b>微信公众号</b>MONASH中国学生会</span></div>' +
          '<div class="item">' + ICON.instagram + '<span><b>Instagram</b>monashcsa</span></div>' +
          '<div class="item">' + ICON.book + '<span><b>小红书</b>MONASH中国学生会</span></div>' +
          '<div class="item">' + ICON.mail + '<span><b>IT Support</b>monashcsait@gmail.com</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© ' + new Date().getFullYear() + ' 蒙纳士中国学生会 Monash Chinese Student Association · Est. 2000</span>' +
        '<span>Caulfield Campus, Monash University · Melbourne, Australia</span>' +
      '</div>' +
    '</div>';
  }

  /* ---------- 图标 ---------- */
  var ICON = {
    wechat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.7 7.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm5.6 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9ZM9 3C4.6 3 1 6 1 9.7c0 2.1 1.2 4 3 5.2l-.7 2.2 2.6-1.3c.9.2 1.8.4 2.8.4h.6a5.6 5.6 0 0 1-.2-1.5C9 11.4 12 8.7 16 8.7h.6C15.8 5.4 12.7 3 9 3Zm7 6.7c-3.3 0-6 2.2-6 4.9s2.7 4.9 6 4.9c.7 0 1.4-.1 2.1-.3l2 1-.6-1.7c1.4-.9 2.4-2.3 2.4-3.9 0-2.7-2.6-4.9-5.9-4.9Zm-2 3.1c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7Zm4 0c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7Z"/></svg>',
    weibo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.1 12c-2.9-.3-5.4.9-5.6 2.7-.2 1.8 2 3.5 4.9 3.8 2.9.3 5.4-.9 5.6-2.7.2-1.8-2-3.5-4.9-3.8Zm-.3 4.8c-1.5.3-2.9-.3-3-1.3-.1-1 .9-2 2.4-2.3 1.5-.3 2.9.3 3 1.3.1 1-.9 2-2.4 2.3Zm9.5-7.1c.3.1.6 0 .8-.3.5-1 .4-2.3-.4-3.2-.8-.9-2-1.2-3.1-.9-.3.1-.5.4-.4.7.1.3.4.5.7.4.6-.2 1.3 0 1.8.5.4.5.5 1.2.2 1.8-.1.3 0 .6.1.7Zm1.9-6.2c-1.7-1.9-4.3-2.6-6.6-2-.4.1-.6.5-.5.8.1.4.5.6.8.5 1.8-.5 3.8.1 5.1 1.6 1.3 1.5 1.6 3.5.9 5.2-.1.4 0 .8.4.9.4.1.8 0 .9-.4.9-2.3.5-4.9-1.4-6.6.2-.2.3-.2.4-.4Z"/></svg>',
    douyin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2 1.5 3.6 3.5 4v2.4c-1.3 0-2.6-.4-3.7-1.1v6.1c0 3.1-2.5 5.6-5.6 5.6S5 17.5 5 14.4s2.5-5.6 5.6-5.6c.3 0 .6 0 .9.1v2.5c-.3-.1-.6-.2-.9-.2-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1V3h3.7Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7c0-1 .3-1.5 1.6-1.5H17V2.2C16.5 2.1 15.6 2 14.6 2 12 2 10.4 3.5 10.4 6.4V9H8v3.3h2.4V22h3.4v-9.7h2.5l.4-3.3H14Z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M19 17H6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
  };
  window.MCSA_ICON = ICON;

  /* ---------- 注入 DOM ---------- */
  function inject() {
    var header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = headerHTML();
    document.body.insertBefore(header, document.body.firstChild);

    var backdrop = document.createElement("div");
    backdrop.className = "menu-backdrop";
    var drawer = document.createElement("nav");
    drawer.className = "mobile-menu";
    drawer.setAttribute("aria-label", "移动端导航");
    drawer.innerHTML = mobileHTML();
    document.body.insertBefore(backdrop, header.nextSibling);
    document.body.insertBefore(drawer, backdrop.nextSibling);

    var footerEl = document.getElementById("site-footer");
    if (!footerEl) {
      footerEl = document.createElement("footer");
      footerEl.id = "site-footer";
      document.body.appendChild(footerEl);
    }
    footerEl.className = "site-footer";
    footerEl.innerHTML = footerHTML();

    // 返回顶部
    var top = document.createElement("button");
    top.className = "to-top"; top.setAttribute("aria-label", "返回顶部");
    top.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(top);

    wire(header, drawer, backdrop, top);
  }

  /* ---------- 交互逻辑 ---------- */
  function wire(header, drawer, backdrop, top) {
    var onScroll = function () {
      var y = window.pageYOffset;
      header.classList.toggle("scrolled", y > 40);
      top.classList.toggle("show", y > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // 移动菜单开关
    var toggle = header.querySelector(".nav-toggle");
    function closeMenu() {
      document.body.classList.remove("menu-open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    backdrop.addEventListener("click", closeMenu);
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });

    // 移动端折叠组
    drawer.querySelectorAll(".m-parent").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var g = btn.parentElement;
        var wasOpen = g.classList.contains("open");
        drawer.querySelectorAll(".m-group").forEach(function (x) { x.classList.remove("open"); });
        if (!wasOpen) g.classList.add("open");
      });
    });

    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    // ESC 关闭
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- 滚动揭示动画 ---------- */
  function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- 数字滚动 ---------- */
  function counters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var dur = 1600, start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---------- 灯箱 ---------- */
  function lightbox() {
    var imgs = document.querySelectorAll("[data-lightbox]");
    if (!imgs.length) return;
    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = '<button class="lightbox__close" aria-label="关闭">&times;</button><img alt="">';
    document.body.appendChild(box);
    var pic = box.querySelector("img");
    var close = function () { box.classList.remove("open"); };
    box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("lightbox__close")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    imgs.forEach(function (im) {
      im.addEventListener("click", function () {
        pic.src = im.getAttribute("data-lightbox") || im.src;
        box.classList.add("open");
      });
    });
  }

  /* ---------- init ---------- */
  function init() { inject(); reveals(); counters(); lightbox(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
