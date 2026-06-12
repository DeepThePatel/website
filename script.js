// RESUME
const pdfContainer = document.getElementById("RESUME_LINK");
if (pdfContainer) {
    pdfContainer.addEventListener("click", function () {
        window.open("Resume_DeepPatel.pdf", "_blank");
    });
}

// MODALS
const galleryModal = document.getElementById("myModal");
if (galleryModal) {
    const galleryImages = document.querySelectorAll(".gallery img");
    const galleryModalImage = document.getElementById("modalImage");
    const galleryCloseBtn = galleryModal.querySelector(".close");

    galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {
            galleryModal.style.display = "block";
            galleryModalImage.src = this.src;
        });
    });

    galleryCloseBtn.addEventListener("click", function () {
        galleryModal.style.display = "none";
    });

    galleryModal.addEventListener("click", function (e) {
        if (e.target === galleryModal) galleryModal.style.display = "none";
    });

    // AI Modal
    const imgModalModalImage = document.getElementById("modalImg");
    const imgModalImages = document.querySelectorAll(".img-modal");

    imgModalImages.forEach(function (image) {
        image.addEventListener("click", function () {
            galleryModal.style.display = "block";
            imgModalModalImage.src = this.src;
        });
    });
}

// MAIN PAGE FADE IN
const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Gradient resize
function resizeGradient() {
    const size = Math.max(window.innerWidth, window.innerHeight) * 0.7;
    document.documentElement.style.setProperty('--gradient-size', `${size}px`);
}

resizeGradient();
window.addEventListener('resize', resizeGradient);