/*
GLOBAL STATE VARIABLES 
*/
let activeDropdown = false;

/*
DROPDOWN MANAGEMENT
*/
triggerDropdown = () => {
    const menu = document.getElementById("dropdown-menu");
    const trigger = document.getElementById("dropdown-trigger-icon");
    if (!activeDropdown) {
        menu.style.opacity="1";
        menu.style.visibility="visible";
        trigger.classList.remove("fa-bars")
        trigger.classList.add("fa-times")
    }
    else {
        menu.style.opacity="0";
        menu.style.visibility="hidden";
        trigger.classList.remove("fa-times")
        trigger.classList.add("fa-bars")
    }
    activeDropdown = !activeDropdown;
}

/*
HOME ASPECTS CAROUSEL MANAGEMENT
*/

moveAspectsCarousel = (event) => {
    const aspectsTrack = document.querySelector(".home-aspects__aspect-container");
    const aspectsWindow = document.querySelector(".home-aspects__aspect-window");
    // get target slide
    const targetSlide = parseInt(event.dataset.itemId);
    // Check if screen is large
    const windowLength = aspectsWindow.offsetWidth;
    if (windowLength > 300) return;
    // translate aspects track
    aspectsTrack.style.transform = "translate(-" + (targetSlide * 300).toString() + "px)";
}