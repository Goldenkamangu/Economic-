// Smooth page load animation with performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const sections = document.querySelectorAll('section');
    
    if (prefersReducedMotion) {
        // Skip animations for users who prefer reduced motion
        sections.forEach(section => {
            section.style.opacity = '1';
        });
    } else {
        // Apply stagger animation for users who allow motion
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.animation = `fadeIn 0.5s ease-out ${index * 0.08}s forwards`;
        });
    }
});

// Add CSS animation with GPU acceleration
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(16px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Touch-friendly focus states */
    button:focus-visible,
    a:focus-visible,
    section:focus-visible {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }

    /* Improve tap effectiveness on touch devices */
    @media (hover: none) and (pointer: coarse) {
        section {
            min-height: 88px;
        }
    }
`;
document.head.appendChild(style);

// Initialize touch support for better mobile interaction
function setupMobileOptimizations() {
    // Prevent double-tap zoom delays on buttons/interactive elements
    const interactiveElements = document.querySelectorAll('section, button, a');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.touchAction = 'manipulation';
        }, { passive: true });
    });

    // Add ripple effect on touch for feedback
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', handleTouchStart, false);
        element.addEventListener('click', handleTouchStart, false);
    });
}

// Simple touch feedback handler
function handleTouchStart(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    // Visual feedback already handled by CSS :active pseudo-class
}

// Run mobile optimizations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileOptimizations);
} else {
    setupMobileOptimizations();
}

// Detect viewport changes for dynamic adaptations
window.addEventListener('orientationchange', () => {
    // Reflow content on orientation change
    window.scrollTo(0, 0);
}, false);

// Responsive viewport listener for modern browsers
window.addEventListener('resize', debounce(() => {
    // Handle any resize-dependent logic
}, 250), false);

// Debounce helper to prevent excessive calls
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
