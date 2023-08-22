document.addEventListener("DOMContentLoaded", function () {
    const pdfContainer = document.getElementById("pdfContainer");
  
    pdfContainer.addEventListener("click", function () {

      const pdfUrl = "Resume.pdf";
      
      window.open(pdfUrl, "_blank");
    });
  });