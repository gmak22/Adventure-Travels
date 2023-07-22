const API = `https://correct-api-destination.onrender.com/destination`;

let bookData = JSON.parse(localStorage.getItem("bookingData")) || [];

let stateContainer = document.getElementById("stateContainer");
let placeContainer = document.getElementById("placeContainer");
let sortByPrice = document.getElementById("sortByPrice");

//Fetching Data 
async function fetchData(URL) {
  try {
    let res = await fetch(URL);
    let data = await res.json();
    console.log(data);
    displayStates(data);
    displayPlaces(data);
  }
  catch (err) {
    console.log(err);
  }
}

fetchData(API);

//Display States;
function displayStates(data) {
  stateContainer.innerHTML = "";

  data.forEach(element => {
    let stateCard = document.createElement("div");
    stateCard.className = "stateCard"

    let location = document.createElement("h3");
    location.textContent = element.location;

    let image = document.createElement("img");
    image.src = element.img;
    image.addEventListener("click", () => {
      let stateArray = []
      data.filter((a) => {
        if (a.id === element.id) {
          stateArray.push(a)
          //console.log(a)
          displayPlaces(stateArray);
        }
      })
    })

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

    let price = document.createElement("h3");
    price.innerText = `Rs. ${item.price}\nPer person`;

    let bookBtn = document.createElement("button");
    bookBtn.innerText = "Book Now";
    bookBtn.className = "bookBtn";
    bookBtn.addEventListener("click", () => {
      let obj = {
        name: item.name,
        price: item.price,
        package: item.package
      }

      //Checking if the place with the same name and price already exists in bookData array
      const isAlreadyBooked = bookData.some((bookedItem) => bookedItem.name === obj.name && bookedItem.price === obj.price);

      if (!isAlreadyBooked) {
        bookData.push(obj);
        localStorage.setItem("bookingData", JSON.stringify(bookData));
        //window.location.href = "./booking.html"
      }
    })

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
    }, 100);
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

let filterImg = document.querySelector(".filterImg");
let radioGroup = document.querySelector(".radio-group");
let radioInputs = document.querySelectorAll(".radio-input");

filterImg.addEventListener('click', open);
window.addEventListener('click', outsideClick);

function open() {
  if (radioGroup.style.display === 'flex') {
    close();
  } else {
    radioGroup.style.display = 'flex';
  }
}

function close() {
  radioGroup.style.display = 'none';
}

function outsideClick(e) {
  if (!radioGroup.contains(e.target) && e.target !== filterImg) {
    close();
  }
}

radioInputs.forEach(function (input) {
  input.addEventListener('click', close);
});