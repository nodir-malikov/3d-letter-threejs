const howToButton = document.querySelector("#how_to_btn");
const hintsView = document.querySelector("#hints_view");
const hintsEdit = document.querySelector("#hints_edit");

howToButton.addEventListener("click", () => {
	hintsView.classList.toggle("hidden");
	hintsEdit.classList.toggle("hidden");
});