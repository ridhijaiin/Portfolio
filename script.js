/* =========================================================
   RIDHI JAIIN — STEP-THROUGH PORTFOLIO
========================================================= */

/* ================= NEURAL NETWORK ================= */
const canvas = document.getElementById("network-canvas");
const ctx = canvas.getContext("2d");

let width, height, nodes = [];
const NODE_COUNT = 55;
const CONNECTION_DIST = 150;
const colors = { cyan: "34, 211, 238", violet: "139, 92, 246" };

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function randomNode() {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.8,
        color: Math.random() > 0.5 ? colors.cyan : colors.violet
    };
}

function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(randomNode());
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DIST) {
                const opacity = (1 - dist / CONNECTION_DIST) * 0.35;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(${colors.cyan}, ${opacity})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }

    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, 0.7)`;
        ctx.fill();
    });
}

function animate() {
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
    });
    draw();
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => { resize(); initNodes(); });
resize(); initNodes(); animate();

/* ================= PANEL NAVIGATION ================= */
const PANEL_ORDER = ["home", "about", "skills", "education", "projects", "contact"];
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const dotsContainer = document.getElementById("step-dots");
const prevBtn = document.getElementById("prev-step");
const nextBtn = document.getElementById("next-step");

let currentIndex = 0;

function switchPanel(targetId) {
    currentIndex = PANEL_ORDER.indexOf(targetId);

    tabs.forEach(t => t.classList.toggle("active", t.dataset.panel === targetId));
    panels.forEach(p => {
        p.classList.remove("active");
        if (p.id === targetId) p.classList.add("active");
    });

    renderDots();
    updateStepButtons();
}

function renderDots() {
    dotsContainer.innerHTML = "";
    PANEL_ORDER.forEach((id, i) => {
        const dot = document.createElement("button");
        dot.className = "step-dot" + (i === currentIndex ? " active" : "");
        dot.setAttribute("aria-label", `Go to ${id}`);
        dot.addEventListener("click", () => switchPanel(id));
        dotsContainer.appendChild(dot);
    });
}

function updateStepButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === PANEL_ORDER.length - 1;
}

tabs.forEach(tab => tab.addEventListener("click", () => switchPanel(tab.dataset.panel)));
document.querySelectorAll("[data-goto]").forEach(btn => btn.addEventListener("click", () => switchPanel(btn.dataset.goto)));

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) switchPanel(PANEL_ORDER[currentIndex - 1]);
});
nextBtn.addEventListener("click", () => {
    if (currentIndex < PANEL_ORDER.length - 1) switchPanel(PANEL_ORDER[currentIndex + 1]);
});

// keyboard arrows as a bonus (desktop only)
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
});

/* ================= TYPING EFFECT ================= */
const typingText = document.querySelector(".typing-text");
const roles = [
    "ML-focused developer",
    "B.E. CSE (AI & ML) student",
    "Python & Django developer",
    "Data-driven problem solver"
];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
        typingText.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
        setTimeout(typeLoop, 70);
    } else {
        typingText.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeLoop, 400);
            return;
        }
        setTimeout(typeLoop, 35);
    }
}
typeLoop();

/* ================= SCROLL SYNC ================= */
function updateStepFromScroll() {
    let closest = 0;
    let closestOffset = Infinity;
    panels.forEach((panel, i) => {
        const rect = panel.getBoundingClientRect();
        const offset = Math.abs(rect.top);
        if (offset < closestOffset) {
            closestOffset = offset;
            closest = i;
        }
    });
    if (closest !== currentIndex) {
        switchPanel(PANEL_ORDER[closest]);
    }
}

window.addEventListener("scroll", () => {
    requestAnimationFrame(updateStepFromScroll);
}, { passive: true });


/* ================= INIT ================= */
renderDots();
updateStepButtons();