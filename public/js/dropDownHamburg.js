function toggleDropdown() {
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = dropdownContent.style.display === "flex" ? "none" : "flex";
}

document.addEventListener('click', function(event) {
    var dropdownContent = document.querySelector(".dropdown-content");
    if (!event.target.closest('.dropdown-hamburg')) {
        dropdownContent.style.display = "none";
    }
});