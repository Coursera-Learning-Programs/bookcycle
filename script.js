// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all main functions
    initializeNavigation();
    initializeSearch();
    initializeSmoothScroll();
    initializeAnimations();
    initializeMembershipForm();
});

// Mobile Navigation Toggle
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
        }
    });

    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Debounce function to limit API calls
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

    // Mock search function - replace with actual API call
    const performSearch = debounce((searchTerm) => {
        console.log('Searching for:', searchTerm);
        // Add actual search implementation here
    }, 500);

    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations on Scroll
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.featured-card, .location-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Membership Form Handling
function initializeMembershipForm() {
    const membershipBtn = document.querySelector('.btn-primary');
    
    membershipBtn.addEventListener('click', () => {
        // Create and show modal
        const modal = createMembershipModal();
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    });
}

// Create Membership Modal
function createMembershipModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.opacity = '0';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Become a Member</h2>
            <form id="membershipForm">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="location">Preferred Location</label>
                    <select id="location" required>
                        <option value="">Select a location</option>
                        <option value="downtown">Downtown</option>
                        <option value="university">University District</option>
                        <option value="suburban">Suburban</option>
                    </select>
                </div>
                <button type="submit" class="btn-primary">Join Now</button>
            </form>
        </div>
    `;

    // Handle modal close
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });

    // Handle form submission
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            location: e.target.location.value
        };
        console.log('Form submitted:', formData);
        // Add actual form submission logic here
        
        // Show success message
        showSuccessMessage(modal);
    });

    return modal;
}

// Show Success Message
function showSuccessMessage(modal) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h2>Welcome to BookCycle!</h2>
            <p>Your membership registration was successful.</p>
            <button class="btn-primary close-success">Close</button>
        </div>
    `;

    modal.querySelector('.close-success').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
}

// Add to Cart functionality (for future implementation)
function initializeCart() {
    // Cart functionality can be added here
}

// Error Handler
function handleError(error) {
    console.error('An error occurred:', error);
    // Add user-friendly error handling here
}