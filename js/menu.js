const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("visible-aside");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("visible-aside");
})