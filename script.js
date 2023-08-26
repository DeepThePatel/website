//RESUME
document.addEventListener("DOMContentLoaded", function () {
  const RESUME_LINK = document.getElementById("RESUME_LINK");

  RESUME_LINK.addEventListener("click", function () {
    const resumeUrl = "Resume.pdf";
    //Open PDF in new window
    window.open(resumeUrl, "_blank");
  });
});

const pdfContainer = document.querySelector(".resume-section");