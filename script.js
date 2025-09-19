// 等待DOM載入完成
document.addEventListener('DOMContentLoaded', function() {
    // 導航欄功能
    initNavigation();
    
    // 平滑滾動
    initSmoothScroll();
    
    // 滾動動畫
    initScrollAnimations();
    
    // 漢堡選單
    initMobileMenu();
    
    // 導航欄滾動效果
    initNavbarScroll();
    
    // 警告橫幅動畫
    initWarningBanner();
    
    // 統計數字動畫
    initCounterAnimation();
    
    // 工具提示
    initTooltips();
});

// 導航欄功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考慮導航欄高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新活動狀態
                updateActiveNavLink(this);
                
                // 關閉移動端選單
                closeMobileMenu();
            }
        });
    });
}

// 更新活動導航連結
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// 平滑滾動
function initSmoothScroll() {
    // 為所有內部連結添加平滑滾動
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滾動動畫
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // 為卡片添加延遲動畫
                if (entry.target.classList.contains('content-card') || 
                    entry.target.classList.contains('deception-card') ||
                    entry.target.classList.contains('feature-card')) {
                    const cards = entry.target.parentElement.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // 觀察所有需要動畫的元素
    const animatedElements = document.querySelectorAll(
        '.content-card, .deception-card, .feature-card, .risk-item, .category-card, .tool-card, .step'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 漢堡選單
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 點擊選單項目時關閉選單
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // 點擊外部區域關閉選單
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// 導航欄滾動效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加背景模糊效果
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 自動隱藏/顯示導航欄
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // 更新活動導航連結
        updateActiveNavOnScroll();
    });
}

// 根據滾動位置更新活動導航連結
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 警告橫幅動畫
function initWarningBanner() {
    const warningBanner = document.querySelector('.warning-banner');
    
    if (warningBanner) {
        // 添加點擊事件
        warningBanner.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 2s infinite';
            }, 100);
        });
        
        // 添加懸停效果
        warningBanner.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        warningBanner.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// 統計數字動畫
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2秒
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // 使用 Intersection Observer 觸發動畫
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// 工具提示
function initTooltips() {
    // 為特定元素添加工具提示
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = e.target.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }
}

// 添加鍵盤導航支援
document.addEventListener('keydown', function(e) {
    // ESC 鍵關閉移動端選單
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // 方向鍵導航
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).findIndex(section => 
            section.getAttribute('id') === currentSection
        );
        
        let nextIndex;
        if (e.key === 'ArrowUp') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        } else {
            nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
        }
        
        const nextSection = sections[nextIndex];
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        e.preventDefault();
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    return currentSection;
}

// 性能優化：節流函數
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 應用節流到滾動事件
window.addEventListener('scroll', throttle(function() {
    updateActiveNavOnScroll();
}, 100));

// 添加載入動畫
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // 添加頁面載入完成的動畫
    document.body.classList.add('loaded');
});

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('JavaScript錯誤:', e.error);
});

// 添加一些實用的工具函數
const utils = {
    // 檢測設備類型
    isMobile: () => window.innerWidth <= 768,
    
    // 檢測是否支援觸控
    isTouchDevice: () => 'ontouchstart' in window,
    
    // 獲取元素相對於視窗的位置
    getElementPosition: (element) => {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
        };
    },
    
    // 平滑滾動到指定位置
    scrollTo: (target, offset = 0) => {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    }
};

// 將工具函數暴露到全域
window.utils = utils;

