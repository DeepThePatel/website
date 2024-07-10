//RESUME
document.addEventListener("DOMContentLoaded", function () {
  const pdfContainer = document.getElementById("RESUME_LINK");

  pdfContainer.addEventListener("click", function () {
    const resumeUrl = "Resume_DeepPatel.pdf";
    //Open PDF in new window
    window.open(resumeUrl, "_blank");
  });
});
 
const pdfContainer = document.querySelector(".resume-section"); 
  
//MODALS
const galleryImages = document.querySelectorAll(".gallery img");
const galleryModal = document.getElementById("myModal");
const galleryModalImage = document.getElementById("modalImage");
const galleryCloseBtn = galleryModal.querySelector(".close");

const images = document.querySelectorAll(".img-modal");
const gallery = document.querySelector(".gallery");
const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

//Fantasy Rescue Modal
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
    if (e.target === galleryModal) {
        galleryModal.style.display = "none";
    }
});

//AI Modal
const imgModalImages = document.querySelectorAll(".img-modal");
const imgModalModal = document.getElementById("myModal");
const imgModalModalImage = document.getElementById("modalImg");
const imgModalCloseBtn = imgModalModal.querySelector(".close");

imgModalImages.forEach(function (image) {
    image.addEventListener("click", function () {
        imgModalModal.style.display = "block";
        imgModalModalImage.src = this.src;
    });
});

imgModalCloseBtn.addEventListener("click", function () {
    imgModalModal.style.display = "none";
});

imgModalModal.addEventListener("click", function (e) {
    if (e.target === imgModalModal) {
        imgModalModal.style.display = "none";
    }
});

