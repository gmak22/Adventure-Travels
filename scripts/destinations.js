const API = `https://adventure-travel-destination.onrender.com/destination`;

let stateContainer = document.getElementById("stateContainer");
let placeContainer = document.getElementById("placeContainer");

//Fetching Data 
async function fetchData(URL){
    try{
      let res = await fetch(URL);
      let data = await res.json();
      console.log(data);
      displayStates(data);
      displayPlaces(data);
    }
    catch(err){
      console.log(err);
    }
  }

fetchData(API);

//Display States;
function displayStates(data){
    stateContainer.innerHTML = "";
  
    data.forEach(element => {
        let stateCard = document.createElement("div");
        stateCard.className = "stateCard"

        let location = document.createElement("h3");
        location.textContent = element.location;

        let image = document.createElement("img");
        image.src = element.img;

        stateCard.append(image,location);
        stateContainer.append(stateCard);
    });
  }

//Display Places
function displayPlaces(data){
    placeContainer.innerHTML = "";
  
    data.forEach(element => {
      let card = createPlace(element.place);
      placeContainer.append(...card);
    })
  }

//Creating placeCard
function createPlace(data){
    let places = [];
    data.forEach(item => {
        let card = document.createElement("div");
        card.className = "placeCard";
      
        let card_img = document.createElement("div");
        card_img.className = "placeImage"
      
        let img = document.createElement("img");
        img.src = item.images;
        img.alt = "Destination";
      
        let card_desc = document.createElement("div");
        card_desc.className = "placeDesc"
      
        let name = document.createElement("h6");
        name.innerText = item.name;
      
        let info = document.createElement("p");
        info.innerText = item.info;

        let rating = document.createElement("p");
        rating.innerText =  item.rating;
      
        let card_price = document.createElement("div");
        card_price.className = "placePrice"

        let price = document.createElement("p");
        price.innerText =  "Rs. "+item.price;
    
        let bookBtn = document.createElement("a");
        bookBtn.innerText = "Book Now";
      
        card_img.append(img);
        card_desc.append(name,info,rating);
        card_price.append(price,bookBtn);
        
        card.append(card_img,card_desc,card_price);

        places.push(card)
    });

    return places;  
  }