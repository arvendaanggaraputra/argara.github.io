/* =====================================================
   ARVENDA PORTFOLIO
   JAVASCRIPT
   ===================================================== */


/* =====================================================
   SCROLL REVEAL
   ===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});



/* =====================================================
   NAVBAR SCROLL
   ===================================================== */

const navbar =
    document.getElementById("navbar");


function updateNavbar() {

    if (!navbar) return;


    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar
);


updateNavbar();



/* =====================================================
   MOBILE MENU
   ===================================================== */

const menuToggle =
    document.getElementById("menuToggle");


const navLinks =
    document.getElementById("navLinks");


if (
    menuToggle &&
    navLinks
) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("open");


            const isOpen =
                navLinks.classList.contains("open");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


            menuToggle.textContent =
                isOpen
                    ? "✕"
                    : "☰";

        }
    );


    document
        .querySelectorAll(".nav-link")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "open"
                    );


                    menuToggle.textContent =
                        "☰";


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}



/* =====================================================
   ACTIVE NAVIGATION
   ===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    navItems.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );


                            if (
                                item.getAttribute(
                                    "href"
                                ) ===
                                `#${entry.target.id}`
                            ) {

                                item.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }

            });

        },

        {
            threshold: 0.45
        }

    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});



/* =====================================================
   DARK / LIGHT MODE
   ===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


if (themeToggle) {

    const savedTheme =
        localStorage.getItem(
            "arven-theme"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light"
        );

        themeToggle.textContent =
            "☾";

    }


    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );


            const isLight =
                document.body.classList.contains(
                    "light"
                );


            themeToggle.textContent =
                isLight
                    ? "☾"
                    : "☼";


            localStorage.setItem(
                "arven-theme",
                isLight
                    ? "light"
                    : "dark"
            );

        }
    );

}



/* =====================================================
   PROJECT CARD TILT
   ===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5)
                    * -3;


                const rotateY =
                    ((x / rect.width) - 0.5)
                    * 3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =====================================================
   CURRENT YEAR
   ===================================================== */

const footerYear =
    document.getElementById(
        "footerYear"
    );


if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} `;

}