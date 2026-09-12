/* =========================================================
   RIDHI JAIIN — PORTFOLIO
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        /* Close menu after clicking a link */

        navItems.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }


    /* =====================================================
       2. HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".header");

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =====================================================
       3. TYPING EFFECT
    ===================================================== */

    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {

        const roles = [
            "ML-Focused Developer",
            "Python Developer",
            "Machine Learning Enthusiast",
            "AI/ML Developer"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typeSpeed = 90;
        const deleteSpeed = 50;
        const pauseAfterTyping = 1600;
        const pauseAfterDeleting = 500;

        function typeText() {

            const currentRole = roles[roleIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentRole.substring(0, characterIndex + 1);

                characterIndex++;

                if (characterIndex === currentRole.length) {

                    deleting = true;

                    setTimeout(typeText, pauseAfterTyping);

                    return;
                }

                setTimeout(typeText, typeSpeed);

            } else {

                typingElement.textContent =
                    currentRole.substring(0, characterIndex - 1);

                characterIndex--;

                if (characterIndex === 0) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) % roles.length;

                    setTimeout(typeText, pauseAfterDeleting);

                    return;
                }

                setTimeout(typeText, deleteSpeed);
            }
        }

        typeText();
    }


    /* =====================================================
       4. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(entry.target);
                        }
                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }


    /* =====================================================
       5. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================================
       6. SMOOTH SCROLLING
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =====================================================
       7. SKILL CARD STAGGER ANIMATION
    ===================================================== */

    const skillCards =
        document.querySelectorAll(".skill-card");

    skillCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;
    });


    /* =====================================================
       8. PROJECT CARD INTERACTION
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 760) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";
        });
    });


    /* =====================================================
       9. SKILL CARD TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(".skill-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 760) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x - rect.width / 2) /
                    rect.width) * 3;

            const rotateX =
                ((y - rect.height / 2) /
                    rect.height) * -3;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-7px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });


    /* =====================================================
       10. CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       11. MOUSE GLOW EFFECT
    ===================================================== */

    const glow =
        document.querySelector(".mouse-glow");

    if (glow) {

        document.addEventListener("mousemove", event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;
        });
    }


    /* =====================================================
       12. PARALLAX HERO VISUAL
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual) {

        window.addEventListener("mousemove", event => {

            if (window.innerWidth <= 760) return;

            const x =
                (event.clientX /
                    window.innerWidth - 0.5) * 10;

            const y =
                (event.clientY /
                    window.innerHeight - 0.5) * 10;

            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;
        });
    }


    /* =====================================================
       13. MAGNETIC BUTTON EFFECT
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".btn-primary, .nav-button"
        );

    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", event => {

            if (window.innerWidth <= 760) return;

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX - rect.left -
                rect.width / 2;

            const y =
                event.clientY - rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.08}px,
                           ${y * 0.08}px)`;
        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";
        });
    });


    /* =====================================================
       14. EDUCATION TIMELINE REVEAL
    ===================================================== */

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );

    if (timelineItems.length) {

        const timelineObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry, index) => {

                            if (
                                entry.isIntersecting
                            ) {

                                setTimeout(() => {

                                    entry.target.classList.add(
                                        "visible"
                                    );

                                }, index * 150);

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );

        timelineItems.forEach(item => {

            item.classList.add("reveal");

            timelineObserver.observe(item);
        });
    }


    /* =====================================================
       15. BACK TO TOP BUTTON
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 600) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================================
       16. PROJECT PLACEHOLDER CLICK
    ===================================================== */

    document
        .querySelectorAll(".project-placeholder")
        .forEach(placeholder => {

            placeholder.addEventListener(
                "click",
                () => {

                    const card =
                        placeholder.closest(
                            ".project-card"
                        );

                    if (!card) return;

                    card.classList.add(
                        "project-highlight"
                    );

                    setTimeout(() => {

                        card.classList.remove(
                            "project-highlight"
                        );

                    }, 1000);
                }
            );
        });


    /* =====================================================
       17. KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener("keydown", event => {

        /*
         * Escape closes mobile navigation
         */

        if (event.key === "Escape") {

            if (
                navLinks &&
                navLinks.classList.contains("active")
            ) {

                navLinks.classList.remove("active");

                const icon =
                    menuToggle?.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );
                }
            }
        }
    });


    /* =====================================================
       18. LAZY IMAGE HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img[data-src]");

    images.forEach(image => {
        image.addEventListener(
            "error",
            () => {
                image.style.display = "none";
            }
        );
    });


    /* =====================================================
       19. PAGE LOAD ANIMATION
    ===================================================== */

    document.body.classList.add("page-loaded");

});


/* =========================================================
   EXTRA UTILITY FUNCTIONS
========================================================= */


/*
 * Copy email address to clipboard.
 *
 * Add:
 * data-copy-email="your@email.com"
 *
 * to an element if you want to use this.
 */

document
    .querySelectorAll("[data-copy-email]")
    .forEach(element => {

        element.addEventListener("click", async () => {

            const email =
                element.getAttribute(
                    "data-copy-email"
                );

            if (!email) return;

            try {

                await navigator.clipboard.writeText(
                    email
                );

                const originalText =
                    element.textContent;

                element.textContent =
                    "Email copied!";

                setTimeout(() => {

                    element.textContent =
                        originalText;

                }, 1500);

            } catch (error) {

                console.error(
                    "Unable to copy email:",
                    error
                );
            }
        });
    });


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%c Ridhi Jaiin ",
    "background:#ff2d95;color:#fff;padding:8px 12px;border-radius:6px;font-weight:bold;"
);

console.log(
    "%c AI/ML Portfolio — Built with HTML, CSS & JavaScript",
    "color:#ff66b3;font-size:12px;"
);
