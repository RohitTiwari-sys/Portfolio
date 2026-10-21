
/* =========================================
   FIREBASE IMPORTS
========================================= */

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import { db } from "./firebase.js";


/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio JavaScript loaded successfully.");



    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navLinks =
        document.getElementById("nav-links");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen.toString()
            );


            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        });


        /*
         * Close mobile menu
         * when navigation link is clicked
         */

        const navigationItems =
            navLinks.querySelectorAll("a");


        navigationItems.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.textContent =
                    "☰";

            });

        });

    }



    /* =========================================
       DARK / LIGHT MODE
    ========================================== */

    const themeToggle =
        document.getElementById("theme-toggle");


    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    /*
     * Restore saved theme
     */

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );


        if (themeToggle) {

            themeToggle.textContent =
                "☀️";

        }

    } else {

        if (themeToggle) {

            themeToggle.textContent =
                "🌙";

        }

    }


    /*
     * Toggle theme
     */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark-mode"
                );


                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "portfolio-theme",
                    isDark
                        ? "dark"
                        : "light"
                );


                themeToggle.textContent =
                    isDark
                        ? "☀️"
                        : "🌙";

            }
        );

    }



    /* =========================================
       ACTIVE NAVIGATION
    ========================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;


            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach((link) => {

            link.classList.remove(
                "active"
            );


            const target =
                link.getAttribute("href");


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();



    /* =========================================
       CONTACT FORM
       FIRESTORE
    ========================================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );


    const formMessage =
        document.getElementById(
            "form-message"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                /*
                 * Stop normal HTML form submission
                 */

                event.preventDefault();


                console.log(
                    "Form submission intercepted."
                );


                /* ==============================
                   GET FORM VALUES
                ============================== */

                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim();


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim();


                console.log(
                    "Name:",
                    name
                );


                console.log(
                    "Email:",
                    email
                );


                console.log(
                    "Message:",
                    message
                );



                /* ==============================
                   VALIDATION
                ============================== */

                if (!name) {

                    showFormMessage(
                        "Please enter your name.",
                        "error"
                    );

                    return;

                }


                if (!email) {

                    showFormMessage(
                        "Please enter your email address.",
                        "error"
                    );

                    return;

                }


                if (!isValidEmail(email)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                if (!message) {

                    showFormMessage(
                        "Please enter your message.",
                        "error"
                    );

                    return;

                }


                if (message.length < 10) {

                    showFormMessage(
                        "Please write at least 10 characters.",
                        "error"
                    );

                    return;

                }


                /* ==============================
                   SUBMIT BUTTON
                ============================== */

                const submitButton =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    submitButton.dataset.originalText =
                        submitButton.textContent;


                    submitButton.textContent =
                        "Sending...";

                }



                /* ==============================
                   FIRESTORE
                ============================== */

                console.log(
                    "Attempting to save message to Firestore..."
                );


                try {

                    const docRef =
                        await addDoc(
                            collection(
                                db,
                                "messages"
                            ),
                            {
                                name: name,
                                email: email,
                                message: message,
                                createdAt:
                                    serverTimestamp()
                            }
                        );


                    console.log(
                        "MESSAGE SAVED SUCCESSFULLY!"
                    );


                    console.log(
                        "Document ID:",
                        docRef.id
                    );


                    /* ==========================
                       SUCCESS MESSAGE
                    ========================== */

                    showFormMessage(
                        "Message sent successfully! I'll get back to you soon.",
                        "success"
                    );


                    /*
                     * Clear form
                     */

                    contactForm.reset();


                } catch (error) {

                    console.error(
                        "FIRESTORE ERROR:",
                        error
                    );


                    console.error(
                        "Error code:",
                        error.code
                    );


                    console.error(
                        "Error message:",
                        error.message
                    );


                    showFormMessage(
                        "Something went wrong. Please try again later.",
                        "error"
                    );

                } finally {

                    /*
                     * Restore button
                     */

                    if (submitButton) {

                        submitButton.disabled =
                            false;


                        submitButton.textContent =
                            submitButton.dataset.originalText ||
                            "Send Message";

                    }

                }

            }
        );

    }



    /* =========================================
       EMAIL VALIDATION
    ========================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        return emailPattern.test(email);

    }



    /* =========================================
       FORM MESSAGE
    ========================================== */

    function showFormMessage(
        message,
        type
    ) {

        if (!formMessage) {

            /*
             * Fallback if form-message
             * element does not exist
             */

            alert(message);

            return;

        }


        formMessage.textContent =
            message;


        formMessage.classList.remove(
            "success",
            "error"
        );


        formMessage.classList.add(
            type
        );


        /*
         * Fallback inline colors.
         * CSS can override these.
         */

        if (type === "success") {

            formMessage.style.color =
                "#16a34a";

        } else {

            formMessage.style.color =
                "#dc2626";

        }


        /*
         * Automatically clear
         * the message after 5 seconds
         */

        setTimeout(() => {

            formMessage.textContent =
                "";

            formMessage.classList.remove(
                "success",
                "error"
            );

        }, 5000);

    }



    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".project-card, " +
            ".skill-category, " +
            ".certification-card, " +
            ".education-card"
        );


    /*
     * Use IntersectionObserver
     * if browser supports it.
     */

    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );


                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
         * Fallback for older browsers
         */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "show"
                );

            }
        );

    }



    /* =========================================
       SMOOTH SCROLLING
    ========================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        "header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });



    /* =========================================
       RESIZE HANDLING
    ========================================== */

    window.addEventListener(
        "resize",
        () => {

            /*
             * Close mobile menu
             * when returning to desktop
             */

            if (
                window.innerWidth > 768 &&
                navLinks
            ) {

                navLinks.classList.remove(
                    "active"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.textContent =
                        "☰";

                }

            }

        }
    );



    /* =========================================
       PAGE LOADED
    ========================================== */

    console.log(
        "Portfolio initialized successfully."
    );

});
