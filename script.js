//RESUME
document.addEventListener("DOMContentLoaded", function () {
  const pdfContainer = document.getElementById("pdfContainer");

  pdfContainer.addEventListener("click", function () {
    const pdfUrl = "Resume.pdf";
    //Open PDF in new window
    window.open(pdfUrl, "_blank");
  });
});

const flexContainer = document.querySelector(".right-section");