import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

let firstname_list = document.querySelector(".firstname_list");
let email_list = document.querySelector(".email_list");
let new_password_list = document.querySelector(".new_password_list");
let form = document.querySelector("form");



async function register() {
    try {
        let obj = {
            "username": firstname_list.value,
            "password": new_password_list.value,
            "email": email_list.value,
        }
        let res = await fetch("https://adventure-travels-json-server.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
        let data = await res.json();
        console.log(data);
        let result = check(data)
        if (result) {
            Swal.fire({
                icon: 'success',
                text: `REGISTATION IS SUCCESSFUL`,
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ENTER CURRECT CREDIENCIAL',

            })
        }
    }
    catch (error) {
        console.log(error)
    }
}

function check(size) {
    if (size) {
        return true;
    } else {
        return false;
    }
}

form.addEventListener("submit", (el) => {
    el.preventDefault();
    fetchURL()

})

async function fetchURL() {
    try {
        let res = await fetch("https://adventure-travels-json-server.onrender.com/register");
        let data = await res.json();
        console.log(data);
        let result = checkuser(data);
        if (result == false) {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'USER IS ALREADY REGISTER',
                // window.location.href="./../Sign-In/Login.html";

            })
            // window.location.href="./../Sign-In/Login.html";

        } else {
            register();
        }
    }
    catch (error) {
        console.log(error)
    }
}

function checkuser(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].username == firstname_list.value || data[i].email == email_list.value) {

            return false;


        }
    }
    return true;

}

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

let loginuser = document.querySelector(".loginNav")
let sign_out = document.querySelector(".sign-out-nav");

function signout(user) {
    if (user.length == 0) {
        console.log(username1.length, "#");
        loginuser.innerHTML = "Login";
        sign_out.innerHTML = "";
        loginuser.addEventListener("click", () => { window.location.href = "./../Sign-In/Login.html" });
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