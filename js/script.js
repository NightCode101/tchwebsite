// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    initializeNavbar();
});

// Hamburger Menu Toggle
function initializeNavbar() {
    const toggle = document.getElementById('navbarToggle');
    const links = document.getElementById('navbarLinks');

    if (!toggle || !links) return;

    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = links.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            links.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            toggle.classList.remove('active');
            links.classList.remove('active');
        }
    });
}

// Initialize Chart.js - Admin Role Distribution
function initializeChart() {
    const ctx = document.getElementById('roleChart');

    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Head Admin', 'Co-Owner', 'Assistant Admin', 'Head Moderator', 'Moderator', 'Support'],
            datasets: [{
                data: [1, 2, 2, 1, 2, 2],
                backgroundColor: [
                    '#FF6B6B',
                    '#4ECDC4',
                    '#4A90E2',
                    '#FFD700',
                    '#FFB347',
                    '#9B59B6'
                ],
                borderColor: '#FFFFFF',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 14,
                            weight: '500'
                        },
                        color: '#2C3E50',
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe team cards and sections
document.querySelectorAll('.team-card, .about__content, .join__content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});