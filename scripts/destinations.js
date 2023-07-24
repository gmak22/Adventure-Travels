const API = `https://correct-api-destination.onrender.com/destination`;

let bookData = JSON.parse(localStorage.getItem("bookingData")) || [];
let loginData = JSON.parse(localStorage.getItem("username"));

let stateContainer = document.getElementById("stateContainer");
let placeContainer = document.getElementById("placeContainer");
let sortByPrice = document.getElementById("sortByPrice");

//Loader
let filterRange = document.querySelector("#filterRange");
let placeSection = document.querySelector("#placeSection");
let stateSection = document.querySelector("#stateSection");
let footer = document.querySelector("footer");
let loader = document.querySelector(".loader");

function hideContent() {
  filterRange.style.display = "none";
  placeSection.style.display = "none";
  stateSection.style.display = "none";
  footer.style.display = "none";
}

function showContent() {
  filterRange.style.display = "block";
  placeSection.style.display = "block";
  stateSection.style.display = "block";
  footer.style.display = "flex";
}

function hideLoader() {
  loader.style.display = "none";
}

function showLoader() {
  loader.style.display = "flex";
}

//Fetching Data 
async function fetchData(URL) {
  try {
    hideContent();
    showLoader();
    let res = await fetch(URL);
    let data = await res.json();
    //console.log(data);
    displayStates(data);
    displayPlaces(data);
    showContent();
    hideLoader();
  }
  catch (err) {
    console.log(err);
    hideContent();
  }
}

fetchData(API);

//Display States;
function displayStates(data) {
  stateContainer.innerHTML = "";

  data.forEach(element => {
    let stateCard = document.createElement("div");
    stateCard.className = "stateCard";
    stateCard.addEventListener("click", () => {
      let stateArray = []
      data.filter((a) => {
        if (a.id === element.id) {
          stateArray.push(a)
          //console.log(a)
          displayPlaces(stateArray);
        }
      })
    })

    let location = document.createElement("h3");
    location.textContent = element.location;

    let image = document.createElement("img");
    image.src = element.img;

    stateCard.append(image, location);
    stateContainer.append(stateCard);
  });
}

//Display Places
function displayPlaces(data) {
  placeContainer.innerHTML = "";

  data.forEach(element => {
    let card = createPlace(element.place);
    placeContainer.append(...card);
  })
}

//Creating placeCard
function createPlace(data) {
  let places = [];
  data.forEach(item => {
    let card = document.createElement("div");
    card.className = "placeCard";

    let card_img = document.createElement("div");
    card_img.className = "placeImage"

    let img = document.createElement("img");
    img.src = item.image;
    img.alt = "Destination";

    let card_desc = document.createElement("div");
    card_desc.className = "placeDesc"

    let name = document.createElement("h3");
    name.innerText = item.name;

    let info = document.createElement("p");
    info.innerText = item.info;

    let rating = document.createElement("p");
    rating.innerText = item.rating;

    let card_pkg = document.createElement("div");
    card_pkg.className = "placePkg"

    let package = document.createElement("p");
    package.innerText = item.package;

    let category = document.createElement("p");
    category.innerText = item.category;

    let card_price = document.createElement("div");
    card_price.className = "placePrice"

    let price = document.createElement("h4");
    price.innerText = `Rs. ${item.price}\nPer person`;

    let bookBtn = document.createElement("button");
    bookBtn.innerText = "Book Now";
    bookBtn.className = "bookBtn";
    bookBtn.addEventListener("click", () => {
      var count = 0;
      count++;
      if (loginData.length > 0) {
        let obj = {
          name: item.name,
          price: item.price,
          package: item.package,
          image: item.image,
        }

        //Checking if the place with the same name and price already exists in bookData array
        const isAlreadyBooked = bookData.some((bookedItem) => bookedItem.name === obj.name && bookedItem.price === obj.price);

        if (!isAlreadyBooked && loginData.length !== "") {
          bookData.push(obj);
          localStorage.setItem("bookingData", JSON.stringify(bookData));
          window.location.href = "./../paymentPage.html";
        }
      }

      else {
        alert("Please log-in first!")
      }
    });

    let sign_out = document.querySelector(".sign-out");
    sign_out.addEventListener("click", () => {
      loginData = JSON.parse(localStorage.getItem("username"));
    });

    card_img.append(img);
    card_pkg.append(package, category);
    card_desc.append(name, info, rating, card_pkg);
    card_price.append(price, bookBtn);

    card.append(card_img, card_desc, card_price);

    places.push(card)
  });

  return places;
}

//Searching Places
let search = document.getElementById("search");
let delayTimer;
search.addEventListener("input", () => {
  placeContainer.innerHTML = "";
  clearTimeout(delayTimer);

  if (search.value === "") {
    fetchData(API);
  }
  else {
    delayTimer = setTimeout(() => {
      let filteredData = [];

      for (let i = 1; i <= 11; i++) {
        fetch(`${API}/${i}`)
          .then((res) => res.json())
          .then((data) => {
            data.place.forEach((element) => {
              if (element["name"].toUpperCase().includes(search.value.toUpperCase())) {
                filteredData.push(element);
                console.log(filteredData);
              }
            });
            displayNewPlaces(filteredData);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 500);
  }
});

//Dispalying Searched Places
function displayNewPlaces(newData) {
  placeContainer.innerHTML = "";

  let card = createPlace(newData);
  placeContainer.append(...card);
}

//window.onload(localStorage.clear());

//Sorting by Price
sortByPrice.addEventListener("change", function () {
  placeContainer.innerHTML = "";
  if (sortByPrice.value === "") {
    fetchData(API);
  }
  else {
    let sortedData = [];
    for (let i = 1; i <= 11; i++) {
      fetch(`${API}/${i}`)
        .then((res) => res.json())
        .then((data) => {
          data.place.forEach((element) => {
            sortedData.push(element);
            console.log(sortedData);
          });
          let ans = sortedData.sort((a, b) => {
            if (sortByPrice.value === "Low") {
              return a["price"] - b["price"];
            }
            else {
              return b["price"] - a["price"];
            }
          })
          console.log(ans)
          displayNewPlaces(sortedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
})

function hideContentNew() {
  placeSection.style.display = "none";
  stateSection.style.display = "none";
  footer.style.display = "none";
}

function showContentNew() {
  placeSection.style.display = "block";
  stateSection.style.display = "block";
  footer.style.display = "flex";
}

// Filter by price range
let one = document.getElementById("radio1");
let two = document.getElementById("radio2");
let three = document.getElementById("radio3");
let four = document.getElementById("radio4");
let five = document.getElementById("radio5");

one.addEventListener("click", () => { prices(1000, 9999) })
two.addEventListener("click", () => { prices(10000, 19999) })
three.addEventListener("click", () => { prices(20000, 29999) })
four.addEventListener("click", () => { prices(30000, 39999) })
five.addEventListener("click", () => { prices(40000, 59999) })

function prices(a, b) {
  hideContentNew();
  let filteredPriceData = [];
  for (let y = 1; y <= 11; y++) {
    fetch(`${API}/${y}`)
      .then(response => response.json())
      .then(data => {
        data.place.forEach((elm) => {
          if (elm["price"] >= a && elm["price"] <= b) {
            filteredPriceData.push(elm);
            console.log(filteredPriceData);
          }
        })
        showContentNew();
        hideLoader();
        displayNewPlaces(filteredPriceData);
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

let radioInp = document.querySelector(".radio-input")
let resetImg = document.querySelector(".resetImg")
resetImg.addEventListener("click", () => {
  fetchData(API)
  radioInp.value = null;
})

const maxScreen = 768;
if (window.innerWidth < maxScreen) {
  filterRange.style.display = "flex";
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