/* =====================================================
   FREELANCE DATA ANALYTICS WEBSITE - JAVASCRIPT
   Handles: Footer visibility, smooth scrolling, animations
   ===================================================== */

// ===== FOOTER VISIBILITY ON SCROLL =====
// Shows footer only when user scrolls to bottom of page

function handleFooterVisibility() {
    const footer = document.querySelector('footer');
    
    // Calculate if user has scrolled to bottom
    // windowHeight + scrollY >= documentHeight means we're at the bottom
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Show footer when within 100px of bottom
    const threshold = 100;
    const isAtBottom = (windowHeight + scrollY) >= (documentHeight - threshold);
    
    if (isAtBottom) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
// Adds smooth scrolling behavior when clicking navigation links

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Only apply smooth scroll to anchor links on the same page
        if (link.href.includes('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').split('#')[1];
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// ===== ACTIVE NAV LINK HIGHLIGHT =====
// Highlights the current page in navigation

function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Normalize paths for comparison
        let normalizedCurrentPath = currentPath;
        
        // Remove trailing slash for comparison (except for root)
        if (normalizedCurrentPath !== '/' && normalizedCurrentPath.endsWith('/')) {
            normalizedCurrentPath = normalizedCurrentPath.slice(0, -1);
        }
        
        // Check if this link matches the current page
        let isActive = false;
        
        if (linkHref === '/') {
            // Home page - match only root or /index.html
            isActive = (normalizedCurrentPath === '/' || normalizedCurrentPath === '/index.html' || normalizedCurrentPath === '');
        } else {
            // Other pages - match if current path starts with link href
            isActive = normalizedCurrentPath === linkHref || 
                       normalizedCurrentPath.startsWith(linkHref + '/') ||
                       normalizedCurrentPath === linkHref + '/index.html';
        }
        
        if (isActive) {
            link.style.background = 'rgba(21, 255, 224, 0.2)';
            link.style.color = '#15ffe0';
        }
    });
}

// ===== CARD ENTRANCE ANIMATIONS =====
// Adds staggered fade-in animation to cards on page load

function animateCardsOnLoad() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Initially hide cards
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Stagger the animation for each card
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // 100ms delay between each card
    });
}

// ===== INITIALIZE ALL FUNCTIONALITY =====
// Runs when DOM is fully loaded

document.addEventListener('DOMContentLoaded', () => {
    // Handle footer visibility on scroll
    window.addEventListener('scroll', handleFooterVisibility);
    
    // Check footer visibility on page load
    handleFooterVisibility();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Highlight active navigation link
    highlightActiveNavLink();
    
    // Animate cards on page load
    animateCardsOnLoad();
    
    console.log('Website initialized successfully!');
});

// ===== HANDLE WINDOW RESIZE =====
// Recalculate footer visibility on window resize

window.addEventListener('resize', () => {
    handleFooterVisibility();
});

// ===== UTILITY: DEBOUNCE FUNCTION =====
// Limits how often a function can be called (useful for scroll/resize events)

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll event for better performance
const debouncedFooterCheck = debounce(handleFooterVisibility, 10);
window.addEventListener('scroll', debouncedFooterCheck);

// ===== MOBILE DROPDOWN MENU =====
// Toggle dropdown menu on mobile devices

function toggleDropdown() {
    const dropdown = document.getElementById('mobileDropdown');
    dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('mobileDropdown');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    
    if (dropdown && !dropdown.contains(e.target) && e.target !== dropdownBtn) {
        dropdown.classList.remove('active');
    }
});
