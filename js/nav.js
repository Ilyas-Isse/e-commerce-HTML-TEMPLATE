const navHTML = `
    <nav class="fixed top-0 w-full z-50 glass transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                <div class="flex-shrink-0 flex items-center">
                    <a href="index.html" class="font-heading font-bold text-3xl tracking-tight text-slate-900 flex items-center gap-2">
                        <i data-lucide="sparkles" class="text-brand-600 h-8 w-8"></i> Aura<span class="text-brand-600">.</span>
                    </a>
                </div>
                <div class="hidden md:flex items-center space-x-8" id="desktop-menu">
                    <a href="index.html" class="nav-item text-slate-600 hover:text-brand-600 font-medium nav-link transition-colors" data-page="index.html">Home</a>
                    <a href="shop.html" class="nav-item text-slate-600 hover:text-brand-600 font-medium nav-link transition-colors" data-page="shop.html">Shop</a>
                    <a href="categories.html" class="nav-item text-slate-600 hover:text-brand-600 font-medium nav-link transition-colors" data-page="categories.html">Categories</a>
                    <a href="about.html" class="nav-item text-slate-600 hover:text-brand-600 font-medium nav-link transition-colors" data-page="about.html">About</a>
                </div>
                <div class="flex items-center space-x-5">
                    <a href="cart.html" class="text-slate-600 hover:text-brand-600 transition-colors relative group">
                        <i data-lucide="shopping-bag" class="w-6 h-6"></i>
                        <span id="cart-badge" class="absolute -top-1 -right-2 bg-amber-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full hidden">0</span>
                    </a>
                    <button id="mobile-menu-btn" class="md:hidden text-slate-600 hover:text-brand-600">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100 absolute w-full transition-all duration-300 opacity-0 -translate-y-2 shadow-lg">
            <div class="px-4 pt-2 pb-6 space-y-1" id="mobile-menu-links">
                <a href="index.html" class="nav-item-mobile block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50" data-page="index.html">Home</a>
                <a href="shop.html" class="nav-item-mobile block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50" data-page="shop.html">Shop</a>
                <a href="categories.html" class="nav-item-mobile block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50" data-page="categories.html">Categories</a>
                <a href="about.html" class="nav-item-mobile block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50" data-page="about.html">About</a>
            </div>
        </div>
    </nav>
`;

class SiteNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = navHTML;
        this.updateLinks();
        this.setActiveLink();
        
        // Re-attach mobile menu listeners since DOM is re-created
        setTimeout(() => {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenuBtn && mobileMenu) {
                // Remove old event listener if any by cloning
                const newBtn = mobileMenuBtn.cloneNode(true);
                mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
                
                newBtn.addEventListener('click', () => {
                    const isHidden = mobileMenu.classList.contains('hidden');
                    if (isHidden) {
                        mobileMenu.classList.remove('hidden');
                        setTimeout(() => {
                            mobileMenu.classList.remove('opacity-0', '-translate-y-2');
                            mobileMenu.classList.add('opacity-100', 'translate-y-0');
                        }, 10);
                    } else {
                        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                        mobileMenu.classList.add('opacity-0', '-translate-y-2');
                        setTimeout(() => {
                            mobileMenu.classList.add('hidden');
                        }, 300);
                    }
                });
            }
        }, 0);
    }

    updateLinks() {
        const inPagesDir = window.location.pathname.includes('/pages/');
        const homePath = inPagesDir ? '../index.html' : 'index.html';
        const pagesPrefix = inPagesDir ? '' : 'pages/';

        const links = this.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'index.html') {
                link.setAttribute('href', homePath);
            } else if (['shop.html', 'categories.html', 'about.html', 'cart.html'].includes(href)) {
                link.setAttribute('href', pagesPrefix + href);
            }
        });
    }

    setActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        // Desktop
        const desktopItems = this.querySelectorAll('.nav-item');
        desktopItems.forEach(item => {
            if (item.getAttribute('data-page') === currentPath) {
                item.classList.remove('text-slate-600');
                item.classList.add('text-brand-600');
            }
        });

        // Mobile
        const mobileItems = this.querySelectorAll('.nav-item-mobile');
        mobileItems.forEach(item => {
            if (item.getAttribute('data-page') === currentPath) {
                item.classList.remove('text-slate-700', 'hover:bg-slate-50');
                item.classList.add('text-brand-600', 'bg-brand-50');
            }
        });
    }
}

customElements.define('site-nav', SiteNav);
