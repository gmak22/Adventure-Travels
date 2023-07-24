import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");

const scrollTracker = document.querySelector(".scroll-tracker");

const scrollTrackingTimeline = new ScrollTimeline({
    source: document.scrollingElement,
    orientation: "block",
    scrollOffsets: [CSS.percent(0), CSS.percent(100)],
});

scrollTracker.animate(
    {
        transform: ["scaleX(0)", "scaleX(1)"],
    },
    {
        duration: 1,
        timeline: scrollTrackingTimeline,
    }
);

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

let username1 = JSON.parse(localStorage.getItem("username")) || "";

let loginuser = document.querySelector(".login")
let sign_out = document.querySelector(".sign-out");

function signout(user) {
    if (user.length == 0) {
        console.log(username1.length, "#");
        loginuser.innerHTML = "Login";
        sign_out.innerHTML = "";
        loginuser.addEventListener("click", () => { window.location.href = "./../../Sign-In/Login.html" });
    } else {
        console.log(username1, "@");
        loginuser.innerHTML = (user.toUpperCase());
    }
}
signout(username1)

sign_out.addEventListener("click", () => {
    let user = "";
    localStorage.setItem("username", JSON.stringify(user));
    signout(user)
})