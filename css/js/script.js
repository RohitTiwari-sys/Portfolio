/* ========================================
   PORTFOLIO JAVASCRIPT
======================================== */


/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.textContent = isOpen
        ? "✕"
        : "☰";

});


/* Close mobile menu after clicking a link */

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";

    });

});


/* ========================================
   DARK / LIGHT MODE
======================================== */

const themeToggle =
    document.getElementById("theme-toggle");


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");


    const darkModeEnabled =
        document.body.classList.contains("dark-mode");


    if (darkModeEnabled) {

        themeToggle.textContent = "☀️";

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    }

});


/* ========================================
   CONTACT FORM VALIDATION
======================================== */

const contactForm =
    document.getElementById("contact-form");


const formMessage =
    document.getElementById("form-message");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();


    const email =
        document.getElementById("email").value.trim();


    const message =
        document.getElementById("message").value.trim();


    /* Clear previous message */

    formMessage.textContent = "";

    formMessage.className = "form-message";


    /* Validate name */

    if (name.length < 2) {

        formMessage.textContent =
            "Please enter a valid name.";

        formMessage.classList.add("error");

        return;
    }


    /* Validate email */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        formMessage.textContent =
            "Please enter a valid email address.";

        formMessage.classList.add("error");

        return;
    }


    /* Validate message */

    if (message.length < 10) {

        formMessage.textContent =
            "Message should contain at least 10 characters.";

        formMessage.classList.add("error");

        return;
    }


    /* Successful validation */

    formMessage.textContent =
        "Your message has been validated successfully.";

    formMessage.classList.add("success");


    /* Clear form */

    contactForm.reset();

});