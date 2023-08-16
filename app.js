const shareButton = document.querySelector(".btn-share");
const factForm = document.querySelector(".fact-form");

shareButton.addEventListener("click", function () {
  if (factForm.classList.contains("hidden")) {
    factForm.classList.remove("hidden");
    shareButton.textContent = "Close";
  } else {
    factForm.classList.add("hidden");
    shareButton.textContent = "Share a fact";
  }
});
