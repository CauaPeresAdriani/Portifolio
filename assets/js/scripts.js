
function initLoader() {
       
const lines = [
    { prompt: "caua@dev:~$ ", text: "whoami" },
    { prompt: "", text: "Cauã Adriani" },

    { prompt: "caua@dev:~$ ", text: "java --version" },
    { prompt: "", text: "openjdk 21.0.2" },

    { prompt: "caua@dev:~$ ", text: "git status" },
    { prompt: "", text: "On branch main" },
    { prompt: "", text: "Your branch is up to date with 'origin/main'." },

    { prompt: "caua@dev:~$ ", text: "mvn clean package" },
    { prompt: "", text: "[INFO] BUILD SUCCESS" },

    { prompt: "caua@dev:~$ ", text: "./portfolio" },
    { prompt: "", text: "✓ HTML" },
    { prompt: "", text: "✓ CSS" },
    { prompt: "", text: "✓ JavaScript" },
    { prompt: "", text: "✓ Java" },
    { prompt: "", text: "✓ Spring Boot" },
    { prompt: "", text: "✓ SQL" },
    { prompt: "", text: "✓ Git" },
    { prompt: "", text: "Welcome!" }
];

const body = document.getElementById("loaderBody");
const screen = document.getElementById("loaderScreen");

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
    if (lineIndex >= lines.length) {
        setTimeout(() => {
            screen.classList.add("hidden");
            document.body.classList.remove("loading");
        }, 100);
        return;
    }

    const current = lines[lineIndex];

    let div = document.getElementById("l" + lineIndex);
    if (!div) {
        div = document.createElement("div");
        div.id = "l" + lineIndex;
        div.className = "line";
        body.appendChild(div);
    }

    div.innerHTML =
        `<span>${current.prompt}</span>${current.text.slice(0, charIndex)}<span class="type-cursor"></span>`;

    charIndex += 2;

    if (charIndex <= current.text.length) {
        setTimeout(typeLine, 6);
    } else {
        div.querySelector(".type-cursor").remove();
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 40);
    }
}

window.addEventListener("load", typeLine);

}

function initThemeToggle() {
    (function(){
            var saved = localStorage.getItem('theme');
            var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            document.documentElement.setAttribute('data-theme', theme);
        })();
    
         var toggleBtn = document.getElementById('themeToggle');
        toggleBtn.addEventListener('click', function(){
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });

}


function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = menuToggle.querySelector("i");

function openMenu() {
    mobileMenu.classList.add("active");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    mobileMenu.classList.remove("active");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Fecha ao clicar em um link
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Fecha ao pressionar ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Fecha clicando fora
document.addEventListener("click", (event) => {
    const clickedMenu = mobileMenu.contains(event.target);
    const clickedButton = menuToggle.contains(event.target);

    if (!clickedMenu && !clickedButton) {
        closeMenu();
    }
});

}

function init() {
    initLoader();
    initThemeToggle();
    initMobileMenu();
}

init();