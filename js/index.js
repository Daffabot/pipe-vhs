let accessButton = document.getElementById("access-button");

accessButton.addEventListener("click", function () {
    window.location.href = "./main/start.html";
});

let splashScreen = document.getElementById("splash-screen");
splashScreen.addEventListener("click", () => {
  splashScreen.classList.add("fadeOut");
  setTimeout(() => {
    // Memberikan hash fragment ke URL
    window.location.hash = "#splash-screen";
  }, 610);
});
window.addEventListener("DOMContentLoaded", function () {
  // Mendapatkan hash fragment saat ini dari URL
  let currentHash = window.location.hash;

  // Melakukan pengecekan atau tindakan lain berdasarkan hash fragment saat ini
  if (currentHash === "#splash-screen") {
    document.getElementById("content").style.display = "block";
  } else {
    document.getElementById("content").style.display = "none";
  }
});
window.addEventListener("hashchange", function () {
  // Mendapatkan hash fragment saat ini dari URL
  let currentHash = window.location.hash;

  // Melakukan pengecekan atau tindakan lain berdasarkan hash fragment saat ini
  if (currentHash === "#splash-screen") {
    document.getElementById("content").style.display = "block";
  } else {
    document.getElementById("content").style.display = "none";
  }
});
