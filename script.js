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