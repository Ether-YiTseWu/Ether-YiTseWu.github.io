(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  // Resolve every local asset from the current page URL.
  // This keeps image links working on GitHub Pages and during local preview.
  const assetUrl = (path = "") => {
    try {
      return new URL(path, document.baseURI).href;
    } catch {
      return path;
    }
  };

  // Content
  $("[data-hero-intro]").textContent = data.profile.heroIntro;
  $("[data-about-primary]").textContent = data.profile.aboutPrimary;
  $("[data-about-secondary]").textContent = data.profile.aboutSecondary;
  $("[data-year]").textContent = new Date().getFullYear();

  $("[data-skills]").innerHTML = data.profile.skills
    .map((skill) => `<span>${escapeHtml(skill)}</span>`)
    .join("");

  $("[data-metrics]").innerHTML = data.metrics
    .map((item) => `
      <div class="metric">
        <strong>${escapeHtml(item.value)}</strong>
        <span>${escapeHtml(item.label)}</span>
      </div>
    `)
    .join("");

  $("[data-awards]").innerHTML = data.awards
    .map((award, index) => `
      <article class="award-card reveal" style="--delay:${index * 90}ms">
        <button class="award-image image-button" type="button"
          data-lightbox-src="${escapeHtml(assetUrl(award.certificate))}"
          data-lightbox-alt="${escapeHtml(award.certificateAlt)}"
          data-lightbox-caption="${escapeHtml(`${award.year} · ${award.title} · ${award.result}`)}">
          <img src="${escapeHtml(assetUrl(award.certificate))}" alt="${escapeHtml(award.certificateAlt)}" loading="lazy">
          <span class="image-hint">View certificate</span>
        </button>
        <div class="award-body">
          <div class="award-meta">
            <span>${escapeHtml(award.category)}</span>
            <time>${escapeHtml(award.year)}</time>
          </div>
          <h3>${escapeHtml(award.title)}</h3>
          <p class="award-result">${escapeHtml(award.result)}</p>
          <p class="award-subresult">${escapeHtml(award.resultZh)}</p>
          <p>${escapeHtml(award.description)}</p>
          <div class="tag-row">${award.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </article>
    `)
    .join("");

  $("[data-patents]").innerHTML = data.patents
    .map((patent) => `
      <article class="patent-card reveal">
        <div class="patent-number">
          <span>Patent No.</span>
          <strong>${escapeHtml(patent.number)}</strong>
        </div>
        <div class="patent-main">
          <div class="patent-title-row">
            <h3>${escapeHtml(patent.title)}</h3>
            <span class="status-pill">${escapeHtml(patent.status)}</span>
          </div>
          <p>${escapeHtml(patent.summary)}</p>
          <dl class="patent-details">
            <div><dt>發明人</dt><dd>${patent.inventors.map(escapeHtml).join("、")}</dd></div>
            <div><dt>申請人</dt><dd>${escapeHtml(patent.assignee)}</dd></div>
            <div><dt>申請日</dt><dd>${escapeHtml(patent.filed)}</dd></div>
            <div><dt>公告日</dt><dd>${escapeHtml(patent.granted)}</dd></div>
          </dl>
        </div>
        <a class="patent-link" href="${escapeHtml(patent.url)}" target="_blank" rel="noopener noreferrer" aria-label="在 Google Patents 查看 ${escapeHtml(patent.number)}">
          <span>Google Patents</span>
          <span aria-hidden="true">↗</span>
        </a>
      </article>
    `)
    .join("");

  $("[data-gallery]").innerHTML = data.gallery
    .map((item) => `
      <figure class="gallery-item reveal">
        <button class="image-button" type="button"
          data-lightbox-src="${escapeHtml(assetUrl(item.image))}"
          data-lightbox-alt="${escapeHtml(item.alt)}"
          data-lightbox-caption="${escapeHtml(`${item.title} · ${item.year}`)}">
          <img src="${escapeHtml(assetUrl(item.image))}" alt="${escapeHtml(item.alt)}" loading="lazy">
        </button>
        <figcaption>
          <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.subtitle)}</span></div>
          <time>${escapeHtml(item.year)}</time>
        </figcaption>
      </figure>
    `)
    .join("");


  // Make broken asset paths visible during deployment checks.
  document.addEventListener("error", (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    image.classList.add("image-load-error");
    image.alt = `圖片載入失敗：${image.getAttribute("src") || "unknown path"}`;
    console.error("Image failed to load:", image.src);
  }, true);

  // Theme
  const root = document.documentElement;
  const themeButton = $("[data-theme-button]");
  const storedTheme = localStorage.getItem("portfolio-theme");
  const preferredDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = storedTheme || (preferredDark ? "dark" : "light");

  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", root.dataset.theme);
  });

  // Mobile navigation
  const menuButton = $("[data-menu-button]");
  const nav = $("[data-nav]");
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  $$("a", nav).forEach((link) => link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }));

  // Header state and active section
  const header = $("[data-header]");
  const sectionLinks = $$(".site-nav a");
  const sections = sectionLinks
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    const position = window.scrollY + 160;
    let current = "";
    sections.forEach((section) => {
      if (section.offsetTop <= position) current = `#${section.id}`;
    });
    sectionLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === current));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((element) => observer.observe(element));

  // Lightbox
  const lightbox = $("[data-lightbox]");
  const lightboxImage = $("[data-lightbox-image]");
  const lightboxCaption = $("[data-lightbox-caption]");
  const closeLightbox = () => lightbox.open && lightbox.close();

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox-src]");
    if (!trigger) return;
    lightboxImage.src = trigger.dataset.lightboxSrc;
    lightboxImage.alt = trigger.dataset.lightboxAlt || "";
    lightboxCaption.textContent = trigger.dataset.lightboxCaption || "";
    lightbox.showModal();
  });
  $("[data-lightbox-close]").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
});
