document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = 0;
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(2, 6, 23, 0.95)';
                navLinks.style.padding = '1rem 0';
                navLinks.style.alignItems = 'center';
            }
        });
    }

    // ==========================================
    // 燈箱控制邏輯 (Lightbox Controller)
    // ==========================================
    
    // 1. 動態建立燈箱 HTML 結構並加到頁面中
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-info">
                <span class="lightbox-meta"></span>
                <h3 class="lightbox-title"></h3>
                <p class="lightbox-desc"></p>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxMeta = lightbox.querySelector('.lightbox-meta');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-desc');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // 2. 開啟燈箱
    const openLightbox = (imgSrc, title, meta, desc) => {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title;
        lightboxMeta.textContent = meta || '';
        lightboxTitle.textContent = title || '';
        lightboxDesc.textContent = desc || '';
        
        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
    };

    // 3. 關閉燈箱
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    };

    // 4. 監聽關閉事件 (點按鈕、點背景、按 ESC 鍵)
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });


    // ==========================================
    // 渲染資料 (Render Data with Click Events)
    // ==========================================
    const renderData = () => {
        const awardsContainer = document.querySelector('.awards-grid');
        const galleryContainer = document.querySelector('.gallery-grid');

        if (typeof siteData !== 'undefined') {
            // 渲染獎項 (Awards)
            if(awardsContainer && siteData.awards) {
                siteData.awards.forEach(award => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <div class="card-img" style="background: #2a3b52; background-image: url('${award.image}'); background-size: cover; background-position: center;"></div>
                        <div class="card-content">
                            <span class="card-date">${award.date}</span>
                            <h3 class="card-title">${award.title}</h3>
                            <p style="color: var(--text-muted); font-size: 0.95rem;">${award.description}</p>
                        </div>
                    `;
                    
                    // 綁定點擊事件開啟燈箱
                    card.addEventListener('click', () => {
                        openLightbox(award.image, award.title, award.date, award.description);
                    });

                    awardsContainer.appendChild(card);
                });
            }

            // 渲染攝影集 (Gallery)
            if(galleryContainer && siteData.gallery) {
                siteData.gallery.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <div class="card-img" style="background: #2a3b52; background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
                        <div class="card-content">
                            <span class="card-date">${item.category}</span>
                            <h3 class="card-title">${item.title}</h3>
                        </div>
                    `;

                    // 綁定點擊事件開啟燈箱 (攝影集預設沒有長描述，帶入空字串)
                    card.addEventListener('click', () => {
                        openLightbox(item.image, item.title, item.category, '');
                    });

                    galleryContainer.appendChild(card);
                });
            }
        }
    };

    renderData();

    // Intersection Observer 滾動漸顯效果
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});