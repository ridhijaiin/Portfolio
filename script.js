/* =========================================================
   RIDHI JAIIN — AI/ML PORTFOLIO
   JavaScript
========================================================= */

/* ================= NEURAL NETWORK CANVAS ================= */
(function () {
    const canvas = document.getElementById("network-canvas");
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];
    const mouse = { x: null, y: null };

    const COLORS = [
        "34, 211, 238",   // cyan
        "139, 92, 246"    // violet
    ];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    }

    function init() {
        const count = Math.min(120, Math.floor((width * height) / 14000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                color: COLORS[Math.floor(Math.random() * COLORS.length)]
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    const opacity = (1 - dist / 130) * 0.35;
                    ctx.strokeStyle = `rgba(${particles[i].color}, ${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, 0.7)`;
            ctx.fill();
        });

        // Mouse connection
        if (mouse.x !== null) {
            particles.forEach(p => {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    const opacity = (1 - dist / 160) * 0.25;
                    ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });
        }
    }

    function update() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    resize();
    animate();
})();


/* ================= NAVBAR SCROLL ================= */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
});


/* ================= MOBILE MENU ================= */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.innerHTML = navLinks.classList.contains("open")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});


/* ================= ACTIVE NAV LINK ================= */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            navItems.forEach(item => {
                item.classList.toggle("active", item.getAttribute("href") === `#${section.id}`);
            });
        }
    });
});


/* ================= TYPING EFFECT ================= */
const typingElement = document.querySelector(".typing-text");
const roles = [
    "AI / ML Developer",
    "Python & Django Developer",
    "Data Science Enthusiast",
    "Final Year CSE (AI & ML) Student"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(type, 2200);
            return;
        }
        setTimeout(type, 70);
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(type, 40);
    }
}

type();


/* ================= SCROLL REVEAL ================= */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


/* ================= SKILL METERS ================= */
const meterBars = document.querySelectorAll(".meter-bar span");
const meterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.dataset.level;
            entry.target.style.width = level + "%";
            meterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

meterBars.forEach(bar => meterObserver.observe(bar));


/* ================= CURRENT YEAR ================= */
document.querySelectorAll(".footer-bottom p").forEach(el => {
    const match = el.textContent.match(/\d{4}/);
    if (match) {
        el.textContent = el.textContent.replace(match[0], new Date().getFullYear());
    }
});