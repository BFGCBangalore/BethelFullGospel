/* =========================================================
   Bethel Full Gospel Church — Interactivity
   ========================================================= */
(function () {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* =========================================================
     Admin Configuration
     ========================================================= */
  const CONFIG = {
    news: [
      "Special youth service this Sunday at 5:00 PM!",
      "Join our 24-hour prayer chain starting this Friday.",
      "New believers class registration is now open.",
      "Welcome to our new website! Explore our ministries and galleries."
    ],
    testimonials: [
      { text: "I came to Bethel broken and lost. The love I found here — from the pastor, the congregation, every single person — completely transformed my life.",
        author: "Priya Kumari", initials: "PK", meta: "Member since 2018 · Bangalore", tag: "Healing", color: "#6c5cff" },
      { text: "The youth ministry here gave me purpose. I was directionless at 19. Today I lead a group of 30 young people.",
        author: "Rajan Samuel", initials: "RS", meta: "Youth leader · Koratagere", tag: "Youth", color: "#ff6aa9" },
      { text: "We were struggling in our marriage. The care cell meetings and Pastor Yogesh's counsel saved our family.",
        author: "Asha & Mohan", initials: "AM", meta: "Married here in 2016", tag: "Family", color: "#29d4c9" },
      { text: "I moved to Bangalore alone, knowing nobody. Within a month at Bethel's carecell, I had a family.",
        author: "Suresh Kumar", initials: "SK", meta: "Carecell leader · Wednesday group", tag: "Community", color: "#ffb86c" },
      { text: "Volunteering with the children's Sunday club opened my eyes. Seeing kids discover faith for the first time fills me with so much joy.",
        author: "Deepa George", initials: "DG", meta: "Children's ministry volunteer", tag: "Serving", color: "#6c5cff" },
      { text: "During the COVID lockdown I was in a very dark place. The online services from Bethel were the only light in my week.",
        author: "Naveen Patel", initials: "NP", meta: "Member since 2020 · Chitradurga", tag: "New Life", color: "#ff6aa9" },
      { text: "Pastor Yogesh's teaching is unlike anything I've experienced. I've grown more in faith in one year here than in the previous ten.",
        author: "Leena Joseph", initials: "LJ", meta: "Member since 2021 · Nagasandra", tag: "Growth", color: "#29d4c9" },
      { text: "My son was addicted and our family was falling apart. The prayer warriors at Bethel interceded for months. Today he is completely free.",
        author: "Mary Rani", initials: "MR", meta: "Prayer group member · Bangalore", tag: "Miracle", color: "#ffb86c" }
    ]
  };

  /* ---------- News Ticker ---------- */
  function initNewsTicker() {
    const ticker = $("#tickerContent");
    if (!ticker) return;
    const items = [...CONFIG.news, ...CONFIG.news];
    ticker.innerHTML = items.map(text => `<span class="ticker-item">${text}</span>`).join("");
    const totalWidth = ticker.scrollWidth;
    const duration = totalWidth / 100;
    ticker.style.animationDuration = `${duration}s`;
  }

  /* ---------- Testimonials Carousel ---------- */
  function initTestimonials() {
    const stage   = document.getElementById("testiStage");
    const track   = document.getElementById("testiTrack");
    const dotsEl  = document.getElementById("testiDots");
    const btnPrev = document.getElementById("testiPrev");
    const btnNext = document.getElementById("testiNext");

    if (!stage || !track || !dotsEl || !btnPrev || !btnNext) return;

    function getPerView() { return window.innerWidth <= 860 ? 1 : 2; }

    track.innerHTML = CONFIG.testimonials.map(t => `
      <div class="testi-card">
        <span class="testi-quote-mark">&ldquo;</span>
        <p class="testi-text">${t.text}</p>
        <div class="testi-footer">
          <span class="testi-avatar" style="background:${t.color};color:#fff;">${t.initials}</span>
          <div class="testi-info">
            <span class="testi-name">${t.author}</span>
            <span class="testi-meta">${t.meta}</span>
          </div>
          <span class="testi-tag" style="background:${t.color}15;color:${t.color};">${t.tag}</span>
        </div>
      </div>
    `).join("");

    const cards   = Array.from(track.querySelectorAll(".testi-card"));
    const total   = cards.length;
    let perView   = getPerView();
    let pages     = Math.ceil(total / perView);
    let cur       = 0;
    let autoTimer = null;
    let dragX     = 0, dragD = 0, dragging = false;

    function buildDots() {
      dotsEl.innerHTML = "";
      for (let i = 0; i < pages; i++) {
        const btn = document.createElement("button");
        btn.className = "testi-dot" + (i === cur ? " active" : "");
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-label", "Page " + (i + 1));
        btn.setAttribute("aria-selected", i === cur ? "true" : "false");
        btn.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(btn);
      }
    }

    function stride() {
      const c = cards[0];
      return c ? c.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 20) : 0;
    }

    function goTo(page, instant) {
      cur = ((page % pages) + pages) % pages;
      const off = cur * perView * stride();
      track.style.transition = instant ? "none" : "transform 0.55s cubic-bezier(.22,1,.36,1)";
      track.style.transform  = `translateX(-${off}px)`;
      dotsEl.querySelectorAll(".testi-dot").forEach((d, i) => {
        d.classList.toggle("active", i === cur);
        d.setAttribute("aria-selected", i === cur ? "true" : "false");
      });
      btnPrev.disabled = false; btnNext.disabled = false;
    }

    function start() { stop(); autoTimer = setInterval(() => goTo(cur + 1), 4800); }
    function stop() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

    btnPrev.addEventListener("click", () => { stop(); goTo(cur - 1); start(); });
    btnNext.addEventListener("click", () => { stop(); goTo(cur + 1); start(); });
    stage.addEventListener("mouseenter", stop);
    stage.addEventListener("mouseleave", start);
    stage.addEventListener("touchstart", (e) => { dragging = true; dragX = e.touches[0].clientX; dragD = 0; stop(); }, { passive: true });
    stage.addEventListener("touchmove", (e) => { if (!dragging) return; dragD = e.touches[0].clientX - dragX; const o = cur * perView * stride() - dragD; track.style.transition = "none"; track.style.transform = `translateX(-${o}px)`; }, { passive: true });
    stage.addEventListener("touchend", () => { dragging = false; goTo(Math.abs(dragD) > 50 ? (dragD < 0 ? cur + 1 : cur - 1) : cur); start(); });
    stage.setAttribute("tabindex", "0");
    stage.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") { stop(); goTo(cur - 1); start(); } if (e.key === "ArrowRight") { stop(); goTo(cur + 1); start(); } });

    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { const n = getPerView(); if (n !== perView) { perView = n; pages = Math.ceil(total / perView); cur = Math.min(cur, pages - 1); buildDots(); } goTo(cur, true); }, 120); }, { passive: true });

    buildDots();
    goTo(0, true);
    start();
  }

  /* ---------- Year stamp ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNewsTicker();
    initTestimonials();
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  /* ---------- Theme toggle ---------- */
  const THEME_KEY = "bfgc.theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  }
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) applyTheme(saved);
  } catch {}
  document.addEventListener("DOMContentLoaded", () => {
    const btn = $("#themeToggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(cur === "dark" ? "light" : "dark");
    });
  });

  /* ---------- Mobile nav ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const navToggle = $("#navToggle");
    const primaryNav = $("#primaryNav");
    if (!navToggle || !primaryNav) return;

    navToggle.addEventListener("click", () => {
      const open = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    primaryNav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---------- Legacy hamburger (preserved for compatibility) ---------- */
  window.toggleMenu = function () {
    const nav = $("#primaryNav");
    const btn = $("#navToggle");
    if (!nav) return;
    const open = nav.classList.toggle("is-open");
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  /* ---------- Smooth scroll with header offset ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const headerH = () => {
      const h = $(".site-header");
      return h ? h.offsetHeight : 72;
    };
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerH() - 12;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = $$('#primaryNav a[href^="#"]');
    if (!navLinks.length) return;
    const sections = navLinks.map(a => {
      const id = a.getAttribute("href").slice(1);
      return { id, link: a, el: document.getElementById(id) };
    }).filter(s => s.el);

    const setActive = () => {
      const y = window.scrollY + 120;
      let current = sections[0];
      for (const s of sections) {
        if (s.el.offsetTop <= y) current = s;
      }
      navLinks.forEach(a => a.classList.remove("active"));
      if (current) current.link.classList.add("active");
    };
    setActive();
    window.addEventListener("scroll", setActive, { passive: true });
  });

  /* ---------- Slideshow ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const slides = $$(".slide");
    if (!slides.length) return;
    let cur = 0;
    setInterval(() => {
      slides[cur].classList.remove("active");
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add("active");
    }, 5000);
  });

  /* ---------- Reveal on scroll ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(el => el.classList.add("active"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  });

  /* ---------- Service flip cards: tap to flip on touch devices ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    $$(".service-card").forEach(card => {
      card.addEventListener("click", () => card.classList.toggle("is-flipped"));
    });
  });

  /* =========================================================
     Ministries — expand / collapse detail panels
     ========================================================= */
  window.showMinistry = function (id) {
    $$(".ministry-detail").forEach(d => d.classList.remove("is-open"));
    const detail = document.getElementById(`${id}-detail`);
    if (detail) {
      detail.classList.add("is-open");
      setTimeout(() => detail.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };
  window.hideMinistries = function () {
    $$(".ministry-detail").forEach(d => d.classList.remove("is-open"));
  };

  /* =========================================================
     Gallery — event modal with paginated images & videos
     ========================================================= */
  const mediaData = {
    youthCamp: {
      images: [
        "videos/youth camp 2023/YOUTH3.jpg",
        "videos/youth camp 2023/youth2.jpg",
        "videos/youth camp 2023/youth7.jpg",
        "videos/youth camp 2023/Youth1.jpg",
        "videos/youth camp 2023/YouthMeet.jpeg",
      ],
      videos: [
        "videos/youthcamp2.mp4",
        "videos/youthcamp3.mp4",
      ]
    },
    christmas: {
      images: [
        "videos/christmas_2024/Childrens3.jpeg",
        "videos/christmas_2024/Childrens4.jpeg",
        "videos/christmas_2024/VBC2024.jpeg",
        "videos/christmas_2024/VBC2025_1.jpeg",
        "videos/christmas_2024/VBC2025.jpeg",
        "videos/christmas_2024/VBC2.jpeg",
        "videos/christmas_2024/VBC3.jpeg",
        "videos/christmas_2024/VBC4.jpeg",
        "videos/christmas_2024/VBC22.jpeg",
      ],
      videos: [
        "videos/christmas_2024/SundaySchoolVideo.mp4",
      ]
    }
  };

  let currentEvent = "";
  let imagePage = 1;
  let videoPage = 1;
  const PER_PAGE = 3;

  function pageCount(arr) { return Math.max(1, Math.ceil(arr.length / PER_PAGE)); }

  window.openEventModal = function (eventKey) {
    if (!mediaData[eventKey]) return;
    currentEvent = eventKey;
    imagePage = 1;
    videoPage = 1;

    const titleEl = $("#eventModalTitle");
    if (titleEl) titleEl.textContent = eventKey === "youthCamp" ? "Youth Camp" : "Children's Sunday Club";

    loadImagePage();
    loadVideoPage();
    const modal = $("#eventModal");
    if (modal) {
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    try { history.pushState({ modal: "event" }, ""); } catch {}
  };

  window.closeEventModal = function () {
    const modal = $("#eventModal");
    if (modal) modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (history.state && history.state.modal === "event") {
      try { history.back(); } catch {}
    }
  };

  function loadImagePage() {
    const gallery = $("#imageGallery");
    const info = $("#imagePageInfo");
    if (!gallery || !currentEvent) return;
    const images = mediaData[currentEvent].images;
    const total = pageCount(images);
    const start = (imagePage - 1) * PER_PAGE;
    const slice = images.slice(start, start + PER_PAGE);
    gallery.innerHTML = "";
    slice.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Gallery image";
      img.onclick = () => openLightbox(src, "image");
      gallery.appendChild(img);
    });
    if (info) info.textContent = `Page ${imagePage} of ${total}`;
  }

  function loadVideoPage() {
    const gallery = $("#videoGallery");
    const info = $("#videoPageInfo");
    if (!gallery || !currentEvent) return;
    const videos = mediaData[currentEvent].videos;
    const total = pageCount(videos);
    const start = (videoPage - 1) * PER_PAGE;
    const slice = videos.slice(start, start + PER_PAGE);
    gallery.innerHTML = "";
    if (!slice.length) {
      gallery.innerHTML = `<p class="muted" style="grid-column:1/-1;text-align:center;">No videos available.</p>`;
    }
    slice.forEach(src => {
      const v = document.createElement("video");
      v.src = src;
      v.muted = true;
      v.loop = true;
      v.controls = true;
      v.onclick = (e) => { e.preventDefault(); openLightbox(src, "video"); };
      gallery.appendChild(v);
    });
    if (info) info.textContent = `Page ${videoPage} of ${total}`;
  }

  window.changePage = function (type, dir) {
    if (type === "image") {
      const total = pageCount(mediaData[currentEvent].images);
      imagePage = Math.min(total, Math.max(1, imagePage + dir));
      loadImagePage();
    } else if (type === "video") {
      const total = pageCount(mediaData[currentEvent].videos);
      videoPage = Math.min(total, Math.max(1, videoPage + dir));
      loadVideoPage();
    }
  };

  /* ---------- Lightbox ---------- */
  window.openLightbox = function (src, type) {
    const img = $("#lightbox-img");
    const vid = $("#lightbox-video");
    const box = $("#lightbox");
    if (!box) return;
    if (type === "image") {
      img.src = src; img.style.display = "block";
      vid.style.display = "none"; vid.pause && vid.pause();
    } else {
      vid.src = src; vid.style.display = "block";
      img.style.display = "none";
      vid.controls = true; vid.autoplay = true;
    }
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  window.closeLightbox = function () {
    const box = $("#lightbox");
    if (!box) return;
    box.classList.remove("is-open");
    const vid = $("#lightbox-video");
    if (vid) { try { vid.pause(); } catch {} }
    document.body.style.overflow = "";
  };

  /* ---------- Click outside modal to close ---------- */
  window.addEventListener("click", (e) => {
    if (e.target.classList && e.target.classList.contains("event-modal")) {
      e.target.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    if (e.target.id === "lightbox") {
      window.closeLightbox();
    }
  });

  /* ---------- ESC to close ---------- */
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = document.querySelector(".event-modal.is-open");
    if (open) open.classList.remove("is-open");
    const lb = $("#lightbox");
    if (lb && lb.classList.contains("is-open")) window.closeLightbox();
    const img = $("#imageModal");
    if (img && img.classList.contains("is-open")) window.closeImageModal();
    document.body.style.overflow = "";
  });

  /* ---------- Back button closes modal ---------- */
  window.addEventListener("popstate", () => {
    const modal = $("#eventModal");
    if (modal && modal.classList.contains("is-open")) {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  });

  /* =========================================================
     Gallery login modal
     ========================================================= */
  const galleryUsers = [
    { mobile: "9000000000", password: "bfgc2024" },
    { mobile: "8888888888", password: "bfgc2024" },
  ];

  window.requestGalleryAccess = function (eventId) {
    const m = $("#gallery-login");
    if (!m) return;
    m.classList.add("is-open");
    const id = $("#requestedGalleryId");
    if (id) id.value = eventId;
  };

  window.validateGalleryLogin = function (e) {
    e.preventDefault();
    const mobile = ($("#gallery-mobile").value || "").trim();
    const password = ($("#gallery-password").value || "").trim();
    const eventId = ($("#requestedGalleryId").value || "").trim();
    const user = galleryUsers.find(u => u.mobile === mobile && u.password === password);
    if (user) {
      window.closeLoginModal();
      window.openEventModal(eventId);
    } else {
      const err = $("#login-error");
      if (err) err.style.display = "block";
    }
    return false;
  };

  window.closeLoginModal = function () {
    const m = $("#gallery-login");
    if (m) m.classList.remove("is-open");
    const err = $("#login-error");
    if (err) err.style.display = "none";
    const mob = $("#gallery-mobile");
    const pwd = $("#gallery-password");
    if (mob) mob.value = "";
    if (pwd) pwd.value = "";
  };

  /* =========================================================
     Image modal
     ========================================================= */
  window.openImageModal = function (src) {
    const m = $("#imageModal");
    const img = $("#modalImage");
    if (!m || !img) return;
    img.src = src;
    m.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  window.closeImageModal = function () {
    const m = $("#imageModal");
    if (m) m.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  /* =========================================================
     Event registration
     ========================================================= */
  window.openRegistration = function (name) {
    const reg = $("#event-registration");
    const span = $("#event-name");
    if (span) span.textContent = name;

    // Reset to form view (in case previous submit showed success)
    const form = $("#event-form");
    const success = $("#reg-success");
    const errMsg = $("#reg-error");
    if (form) { form.style.display = ""; form.reset(); }
    if (success) success.style.display = "none";
    if (errMsg) errMsg.style.display = "none";

    // Reset submit button
    const btn = $("#reg-submit-btn");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'Confirm Registration <span class="btn-arrow" aria-hidden="true">&rarr;</span>';
    }

    if (reg) {
      reg.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  };
  window.closeRegistration = function () {
    const reg = $("#event-registration");
    if (reg) reg.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  /* =========================================================
     Firebase: Save event registrations to Firestore
     ========================================================= */
  window.addEventListener("firebase-ready", () => {
    const form = document.getElementById("event-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const { db, collection, addDoc, serverTimestamp } = window.firebase;
      if (!db) { console.error("Firebase not ready"); return; }

      const eventName = (document.getElementById("event-name")?.textContent || "").trim();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();

      const submitBtn = document.getElementById("reg-submit-btn");
      const errMsg = document.getElementById("reg-error");
      const originalHTML = submitBtn.innerHTML;

      // Disable + show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">Saving\u2026</span>';
      if (errMsg) errMsg.style.display = "none";

      try {
        // Save to Firestore
        await addDoc(collection(db, "registrations"), {
          eventName,
          name,
          email: email || null,
          phone,
          createdAt: serverTimestamp()
        });

        // Also send to Formspree in the background (does not redirect or show Formspree's thank you page)
        try {
          await fetch("https://formspree.io/f/movdlber", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              event: eventName,
              name: name,
              email: email || "N/A",
              phone: phone
            })
          });
        } catch (formspreeErr) {
          console.warn("Formspree backup submission failed:", formspreeErr);
        }

        // Show success state
        form.style.display = "none";
        const success = document.getElementById("reg-success");
        const successEvent = document.getElementById("reg-success-event");
        if (successEvent) successEvent.textContent = eventName;
        if (success) success.style.display = "block";

      } catch (err) {
        console.error("Registration error:", err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        if (errMsg) {
          errMsg.textContent = "Something went wrong. Please try again.";
          errMsg.style.display = "block";
        }
      }
    });
  });

  /* =========================================================
     Gallery modal — Photos / Videos tab switching
     ========================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = $$(".g-tab");
    if (!tabs.length) return;
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.toggle("is-active", t === tab));
        $$(".g-pane").forEach(p => p.classList.toggle("is-active", p.dataset.pane === target));
      });
    });
  });

  // Reset to "Photos" tab whenever the gallery modal opens
  const _origOpenEventModal = window.openEventModal;
  window.openEventModal = function (eventKey) {
    const result = _origOpenEventModal.apply(this, arguments);
    const firstTab = document.querySelector('.g-tab[data-tab="images"]');
    if (firstTab && !firstTab.classList.contains("is-active")) firstTab.click();
    return result;
  };

  /* =========================================================
     Carecell — preserved for compatibility
     ========================================================= */
  window.callCarecell = function (phone) {
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(phone);
    } catch {}
    window.location.href = `tel:${phone}`;
  };

  /* =========================================================
     Scroll progress bar + back-to-top FAB
     ========================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    const bar = $("#scrollProgress");
    const fab = $("#backToTop");

    const onScroll = () => {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      if (bar) bar.style.width = pct + "%";
      if (fab) fab.classList.toggle("is-visible", window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (fab) {
      fab.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });
})();
