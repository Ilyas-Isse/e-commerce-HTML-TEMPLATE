document.addEventListener('DOMContentLoaded', () => {
    // Add to cart buttons animation
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartBadge = document.getElementById('cart-badge');
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    
    function updateCartBadge() {
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            if (cartCount > 0) {
                cartBadge.classList.remove('hidden');
            } else {
                cartBadge.classList.add('hidden');
            }
        }
    }
    
    updateCartBadge();

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            updateCartBadge();
            
            // Button animation
            const originalText = btn.innerHTML;
            btn.innerHTML = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Added';
            btn.classList.add('bg-green-600', 'hover:bg-green-700');
            btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
            
            if (cartBadge) {
                cartBadge.classList.add('animate-pop');
                setTimeout(() => {
                    cartBadge.classList.remove('animate-pop');
                }, 300);
            }

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                btn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
            }, 2000);
        });
    });
});
