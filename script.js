
// Memilih bagian website yang akan dianimasikan
const sections = document.querySelectorAll(
    ".about, .projects, .contact"
);

// Menyiapkan pengamat saat elemen masuk ke layar
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

// Mengamati setiap bagian
sections.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
});