import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

let LS = localStorage.getItem("bookingData");

let destination = document.querySelector("#location");
let price = document.querySelector("#plan")

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
        price.value = e.price;
    })

}

let calBtn = document.querySelector(".calBtn");
calBtn.addEventListener("click", calculateTotalAmount);

let cupBtn = document.querySelector(".cupBtn");
cupBtn.addEventListener("click", applyCoupon);

function calculateTotalAmount() {

    const pricePerPerson = Number(document.getElementById('plan').value);
    const numberOfPersons = Number(document.getElementById('guest').value);


    // Calculate total amount (price per person * no. of persons) + 5% GST
    const gstPercentage = 5;
    const gstAmount = (pricePerPerson * numberOfPersons * gstPercentage) / 100;


    const totalAmount = pricePerPerson * numberOfPersons + gstAmount;

    // Display the total amount
    document.getElementById('gst').value = Math.floor(gstAmount);
    document.getElementById('totalAmount').value = Math.floor(totalAmount);

    //   localStorage.setItem('totalAmountPayable', totalAmount.toFixed());
    localStorage.setItem('numberOfPersons', numberOfPersons);

}

function applyCoupon() {
    const couponCodeInput = document.getElementById('coupon');
    const couponCode = couponCodeInput.value;
    const totalAmountInput = document.getElementById('totalAmount');
    const finalAmountInput = document.getElementById('finalAmount');

    const totalAmount = Number(totalAmountInput.value);


    if (totalAmount > 50000 && couponCode === 'Adventure20') {

        const discountPercentage = 20;
        const discountAmount = (totalAmount * discountPercentage) / 100;
        const finalAmount = totalAmount - discountAmount;

        finalAmountInput.value = Math.floor(finalAmount);


        let finalAmountsArray = JSON.parse(localStorage.getItem('finalAmounts')) || [];
        finalAmountsArray.push(finalAmount);

        localStorage.setItem('finalAmounts', JSON.stringify(finalAmountsArray));


        displayFinalAmounts(finalAmountsArray);

        alert('Coupon applied successfully!');


    }

    else if (totalAmount < 50000) {
        alert('coupon not applicable.');

        finalAmountInput.value = Math.floor(totalAmount);

        let finalAmountsArray = JSON.parse(localStorage.getItem('finalAmounts')) || [];
        finalAmountsArray.push(totalAmount);

        localStorage.setItem('finalAmounts', JSON.stringify(finalAmountsArray));


        displayFinalAmounts(finalAmountsArray);

    }

    else {
        alert('Invalid coupon code');
        finalAmountInput.value = Math.floor(totalAmount);

    }


}

function validateInputs() {
    // const inputs = document.querySelectorAll("input");
    const persons = document.querySelector("#guest").value;
    const finalAmount = document.querySelector("#finalAmount").value;

    console.log("persons = ", persons, "finalamount = ", finalAmount);

    if (persons && finalAmount) {
        return true;
    }
    else {
        alert("Please fill in all the input fields before proceeding.");
        return false;
    }
}

const checkoutButton = document.getElementById("checkout");
checkoutButton.addEventListener("click", () => {
    if (validateInputs()) {
        window.location.href = "checkoutPage.html";
    }
});

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

let loginuser = document.querySelector(".login");
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