//RESUME
document.addEventListener("DOMContentLoaded", function () {
  const pdfContainer = document.getElementById("RESUME_LINK");

  pdfContainer.addEventListener("click", function () {
    const resumeUrl = "Resume.pdf";
    //Open PDF in new window
    window.open(resumeUrl, "_blank");
  });
});
 
const pdfContainer = document.querySelector(".resume-section");

//MODAL
const gallery = document.querySelector(".gallery");
const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

gallery.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        modal.style.display = "block";
        modalImage.src = e.target.src;
    }
});

closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
