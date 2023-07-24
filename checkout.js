import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";


let LS = localStorage.getItem("bookingData");

let destination = document.querySelector("#location");
let days = document.querySelector("#days")
let image = document.querySelector("#img")

if (LS == null) {
    LS = [];
}
else {
    LS = JSON.parse(LS)
}

Display(LS)

function Display(arr) {
    LS.innerHTML = ""

    arr.map((e) => {

        destination.value = e.name;
        days.value = e.package;
        image.setAttribute("src", e.image)
    })

}

const dataFromLocalStorage = localStorage.getItem("finalAmounts");


const finalAmountsArray = JSON.parse(dataFromLocalStorage);

const totalInput = document.getElementById("total");

if (Array.isArray(finalAmountsArray) && finalAmountsArray.length > 0) {
    const lastElement = finalAmountsArray[finalAmountsArray.length - 1];
    totalInput.value = lastElement;
}

function displayStoredPrice() {
    const storedPrice = localStorage.getItem("numberOfPersons");
    if (storedPrice !== null) {
        const person = document.querySelector("#person");
        person.value = storedPrice;
    }
}
displayStoredPrice();


function validateInputs() {
    const inputs = document.querySelectorAll("input");
    let isValid = true;

    inputs.forEach(input => {
        if (input.value === "") {
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Please fill in all the input fields before proceeding.");
    }
    else {
        alert("confirm?");
    }

    return isValid;
}

const checkoutButton = document.getElementById("submit");
checkoutButton.addEventListener("click", () => {
    if (true) {
        window.location.href = "endPage.html"
    }
});


function deleteLocalStorageData() {
    localStorage.clear();

}

// Attach the click event handler to the button
const deleteButton = document.getElementById('submit');
deleteButton.addEventListener('click', deleteLocalStorageData);

// main index.js code

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