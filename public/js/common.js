
const input = document.querySelectorAll('input[type="text"], input[type="password"],input[type="email"]')

input.forEach((input) => {
    input.addEventListener("focus", () => {
        input.classList.add("searchIptClick");
    });
    input.addEventListener("focusout", () => {
        input.classList.remove("searchIptClick");
    });
});