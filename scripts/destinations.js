const API = `https://correct-api-destination.onrender.com/destination`;

let stateContainer = document.getElementById("stateContainer");
let placeContainer = document.getElementById("placeContainer");

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

  if(search.value === ""){
    fetchData(API);
  }
  else{
    delayTimer = setTimeout(() => {
      let filteredData = [];

      for (let i = 1; i <= 11; i++){
        fetch(`${API}/${i}`)
          .then((res) => res.json())
          .then((data) => {
            data.place.forEach((element) => {
              if(element["name"].toUpperCase().includes(search.value.toUpperCase())){
                filteredData.push(element);
                console.log(filteredData);
              }
            });
            displaySearchedPlaces(filteredData);    
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 3000);
  }
});

//Dispalying Searched Places
function displaySearchedPlaces(newData) {
  placeContainer.innerHTML = "";

  newData.forEach(item => {
    let card = createPlace(item);
    placeContainer.append(...card);
  })
}