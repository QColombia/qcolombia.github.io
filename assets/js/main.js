let activeDropdown = false;

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