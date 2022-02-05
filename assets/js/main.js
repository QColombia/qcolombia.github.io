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
HOME CAROUSEL MANAGEMENT
*/

/*
Get target DOM elements
*/
const getHomeCarouselElements = () => {
    const track = document.querySelector(".home-hero__carousel");
    const slides = Array.from(track.children);
    const navButtons = document.querySelector(".home-hero__carousel__button-container")
    const dots = Array.from(navButtons.querySelectorAll(".home-hero__carousel__nav-button"));
    return { 
        track, 
        slides, 
        navButtons,
        dots
    };
}

/*
Properly arrange slides with left property and
absolute positioning
*/
const setSlidePosition = (slide, idx) => {
    const slideWidth = slide.getBoundingClientRect().width;
    slide.style.left = (idx * slideWidth).toString() + 'px';
}
const arangeSlides = () => {
    const { slides } = getHomeCarouselElements();
    slides.forEach(setSlidePosition)
}
arangeSlides();

/*
Translate track to go to
target slide from current slide
*/
const moveToSlide = (track, currentSlide, targetSlide) => {
    // Do nothing if there is no next slide
    if (!targetSlide) return;
    const moveAmount = targetSlide.style.left;
    // translate whole track
    track.style.transform = "translateX(-" + moveAmount + ")";
    // update current slide
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");   
}
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("active");
    targetDot.classList.add("active");
}

/*
Move home carousel to right
*/
const moveCarouselToRight = () => {
    const { track, navButtons } = getHomeCarouselElements();
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navButtons.querySelector(".active");
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);

    if (nextDot.classList.contains("home-hero__carousel__button")) return;

    updateDots(currentDot, nextDot);
}

/*
Move home carousel to left
*/
const moveCarouselToLeft = () => {
    const { track } = getHomeCarouselElements();
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = navButtons.querySelector(".active");
    const prevDot = currentDot.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);

    if (prevDot.classList.contains("home-hero__carousel__button")) return;

    updateDots(currentDot, prevDot);
}

/*
Move home carousel to ith slide
*/
const { navButtons } = getHomeCarouselElements();
navButtons.addEventListener("click", e => {
    const targetDot = e.target.closest(".home-hero__carousel__nav-button");

    if (!targetDot) return;

    const { track, navButtons, dots, slides } = getHomeCarouselElements();
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = navButtons.querySelector(".active");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})

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