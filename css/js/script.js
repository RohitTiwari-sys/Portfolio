
/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.textContent = isOpen
                ? "✕"
                : "☰";
        });


        // Close menu after clicking a navigation link

        const navigationItems =
            navLinks.querySelectorAll("a");

        navigationItems.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            });

        });

    }



    /* =========================================
       DARK MODE
    ========================================== */

    const themeToggle =
        document.getElementById("theme-toggle");


    const savedTheme =
        localStorage.getItem("portfolio-theme");


    // Restore previously selected theme

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    } else {

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

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

        });

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


    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 120;

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

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();



    /* =========================================
       CONTACT FORM
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

                event.preventDefault();


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



                /* =================================
                   VALIDATION
                ================================== */

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
                        "Please write a little more about your message.",
                        "error"
                    );

                    return;

                }



                /* =================================
                   CURRENT FORM HANDLING
                ==================================

                   Firebase/email backend can be
                   connected here later.

                ================================== */

                showFormMessage(
                    "Thank you! Your message has been received.",
                    "success"
                );


                contactForm.reset();

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
            return;
        }


        formMessage.textContent =
            message;


        if (type === "success") {

            formMessage.style.color =
                "#16a34a";

        } else {

            formMessage.style.color =
                "#dc2626";

        }


        setTimeout(() => {

            formMessage.textContent = "";

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


    if ("IntersectionObserver" in window) {

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

    }



    /* =========================================
       PREVENT HASH JUMP
       WITH SMOOTH SCROLL
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
                    link.getAttribute("href");


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
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });



    /* =========================================
       CLOSE MOBILE MENU ON RESIZE
    ========================================== */

    window.addEventListener(
        "resize",
        () => {

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

});
