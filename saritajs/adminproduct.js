let urldata=`https://correct-api-destination.onrender.com/destination`;
let tbody=document.querySelector("tbody"); 
let select=document.getElementById("select");
let totaluser=document.getElementById("totaluser-count");

let totalMale=document.getElementById("totalMale-count");
let malepercent=document.getElementById("malepercent");
let totalfemale=document.getElementById("totalFemale-count")
let femalepercent=document.getElementById("femalepercentage");
select.addEventListener("change",function(){
    // window.addEventListener("load",function(){
    fetcheddata(urldata,select.value);
// });
})
function fetcheddata(url,name){
    let data=fetch(`${url}?location=${name}`,{
       method:'GET', 
    }).then(function(res){
        return res.json();
    }).then(function(list){
        display(list[0].place);
       let k=list[0].place.length;
        let d=0;
        totaluser.innerHTML=k;
        for(let i=0;i<k;i++){
            if(list[0].place[i].category=="Temple"){
         d++;
            }
        }
let g=d/k*100;
malepercent.innerHTML=`+${g}%`;
femalepercent.innerHTML=`+${100-g}%`;
        totalMale.innerHTML=d;
        totalfemale.innerHTML=k-d;
    }).catch(function(error){
        console.log(error);
    })
    return data;
}

function display(data){
tbody.innerHTML="";
for(let i=0;i<data.length;i++){
    tbody.append(row(data[i]));
}
}

function row(ele){
    let drow=document.createElement("tr");
    let destname=document.createElement("td");
    // let destimage=document.createElement("td");
    let destprice=document.createElement("td");
let destpackage=document.createElement("td");
let destcategory=document.createElement("td");
// let destrating=document.createElement("td");
let destrate=document.createElement("td");
    let destedit=document.createElement("td");
    let destbutton=document.createElement("td");
    let desteditb=document.createElement("button");
    desteditb.setAttribute("class","tdbutton");
    desteditb.setAttribute("id","td-destedit-button");
    let destdeleteb=document.createElement("button");
    destdeleteb.setAttribute("class","tdbutton");
    destdeleteb.setAttribute("id","td-destdelete-button");
    
    destname.innerHTML=ele.name;
    // destimage.innerHTML=ele.image;
    destprice.innerHTML=ele.price;
    destpackage.innerHTML=ele.package;
    destcategory.innerHTML=ele.category;
    // destrating.innerHTML=ele.rating;
    destrate.innerHTML=ele.rate;
    desteditb.innerHTML="Edit";
    destdeleteb.innerHTML="Delete";
    
    destedit.addEventListener("click",function(){
        editeddata(ele);
    })
    destdeleteb.addEventListener("click",function(){
        deletefn(ele.name)
    })
    destedit.append(desteditb);
    destbutton.append(destdeleteb);
    drow.append( destname,destprice,destpackage,destcategory,destrate,destedit,destbutton);
        return drow;
}

let addNewDataBtn=document.getElementById("add-data-icon");

let maincont=document.querySelector(".container");
let newdatadiv=document.getElementById("newdatadiv");
let updatedatadiv=document.getElementById("updatadiv");
let rightsection=document.querySelector(".right-section");
addNewDataBtn.addEventListener("click",addnewdatafunc);

let flag=1;
function addnewdatafunc(){
if(flag==1){
    maincont.style.gridTemplateColumns = "12rem auto 23rem";
    rightsection.style.display="block";
    updatedatadiv.style.display="none";
    flag=0;
    // console.log(flag);
}
// console.log(flag);
else if(flag==0){
    maincont.style.gridTemplateColumns = "12rem auto";
        rightsection.style.display="none";
        flag=1;
        console.log(flag);
}
}
let p=1;


let editdestination=document.getElementById("editdestination");
let editprice=document.getElementById("editprice");
let editpackage=document.getElementById("editpackage");
let editcategory=document.getElementById("editcategory");
let editrate=document.getElementById("editrate");

function editeddata(ele){
     if(p==1){
        maincont.style.gridTemplateColumns = "12rem auto 23rem";
        rightsection.style.display="block";
        newdatadiv.style.display="none";
        editdestination.value=ele.name;
        editprice.value=ele.price;
        editpackage.value=ele.package;
        editcategory.value=ele.category;
        editrate.value=ele.rate;
        p=0;
    }
    else if(p==0){
        maincont.style.gridTemplateColumns = "12rem auto";
        rightsection.style.display="none";
        p=1;
    }  
}
let editdatabtn=document.getElementById("editdatabtn");
editdatabtn.addEventListener("click",function(){
  postDataToAPI();
});

function postDataToAPI(){
    
  let id;
  fetch(`https://correct-api-destination.onrender.com/destination`)
  .then(res => res.json())
  .then((data) => {
        
      data.forEach(element => {
          if(element.name == select.value){
              addLoc(element.id)
          }
      });
  }) 
};



function CreateObject(name,price, package, catogary){
  this.name = name;
  // this.info = information;
  // this.images = image;
  this.price = price;
  this.package = package;
  this.catogary = catogary;
  this.rate=rate;
};

function addLoc(id)
{
  fetch(`https://frail-show.onrender.com/data/${id}`)
  .then(response => response.json())
  .then(data => {
           let name=document.getElementById("editdestination").value;
let price=document.getElementById("editprice").value;
let package=document.getElementById("editpackage").value;
let category=document.getElementById("editcategory").value;
let rate=document.getElementById("editrate").value;
    const newTourist = new CreateObject(name, price, package, category,rate);
    console.log(newTourist);
    data.place.push(newTourist);
    //console.log(data.tourist)
    fetch(`https://correct-api-destination.onrender.com/destination/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result.place);
      })
      .catch(error => {
        console.error( error);
      });
  })
  .catch(error => {
    console.error(error);
  });
  alert (`Data has been added !`);
  //window.location.href="./adminProductPage.html";
}


























let newdatabtn=document.getElementById("newdatabtn");


// let newdestination=document.getElementById("newdestination");
// let newprice=document.getElementById("newprice");
// let newpackage=document.getElementById("newpackage");
// let newcategory=document.getElementById("newcategory");
// let newrate=document.getElementById("newrate");

// // let j=`${urldata}?location=${select.value}`;


// function newdatafn(){
//     let newd={
//         name:newdestination.value,
//         price:newprice.value,
//         package:newpackage.value,
//        category:newcategory.value,
//         rate:newrate.value,
//     }
//     fetch(`${urldata}?location=${select.value}`,{
//         method:"POST",
//         headers:{
//           'Content-Type':'application/json',
//         },
//         body:JSON.stringify(newd), 
//       }).then(function(res){
//         return res.json;
//       }).then(function(list){
//         fetcheddata(urldata);
//       if(flag==0){
//             maincont.style.gridTemplateColumns = "12rem auto";
//                 rightsection.style.display="none";
//                 flag=1;
//         }
        
//       }).catch(function(error){
//         console.log(error);
//       })
// }

// let editdatabtn=document.getElementById("editdatabtn");
// editdatabtn.addEventListener("click",editdatafunc);

// function editdatafunc(){
//     let editd={
//         price:editprice.value,
//         package:editpackage.value,
//         category:category.value,
//         rate:editrate.value,
//     }
//     fetch(`${urldata}/${editdestination.value}`,{
//         method:"PATCH",
//         headers:{
//           'Content-Type':'application/json',
//         },
//         body:JSON.stringify(editd), 
//       }).then(function(res){
//         return res.json;
//       }).then(function(list){
//         fetcheddata(urldata);
//       }).catch(function(error){
//         console.log(error);
//       })
//       if(p==0){
//             maincont.style.gridTemplateColumns = "12rem auto";
//             rightsection.style.display="none";
//             p=1;
//         }  
// }





































// let loc = document.getElementById("location");



















let getuserdata=document.getElementById("allusersdata");

getuserdata.addEventListener("click",function(){
    window.location.href="./adminuser.html";
});




// let tbody = document.querySelector("tbody");

// fetchAndRenderUsers()
// function fetchAndRenderUsers(){
//     fetch(`https://correct-api-destination.onrender.com/destination`)
//     .then(res => res.json())
//     .then((data) => {
//         tbody.innerHTML = null;
//         let cardList = getCardList(data);
//         tbody.append(cardList);

//         return tbody;

//     })
// }

// function getCardList(data){

//     // let cardList = document.createElement("div");
//     // tbody.classList.add("card-list");

//     data.forEach(ele => {
//         let locEl = ele.name;
//         let id = ele.id;
//         let arr = ele.place;

//         arr.forEach(item => {
//             let card = getCard(item.name, item.category, item.package, item.price,item.rate, locEl, id);

//             tbody.append(card);
//             // console.log(tbody);
//         })
//     });
//     return tbody;
   
// };


// function getCard(nameEl, catogaryEl, packageEl, priceEl,rateEl,locEl,id){
//         let drow=document.createElement("tr");
//     let destname=document.createElement("td");
//     // let destimage=document.createElement("td");
//     let destprice=document.createElement("td");
// let destpackage=document.createElement("td");
// let destcategory=document.createElement("td");
// // let destrating=document.createElement("td");
// let destrate=document.createElement("td");
//     let destedit=document.createElement("td");
//     let destbutton=document.createElement("td");
//     let desteditb=document.createElement("button");
//     desteditb.setAttribute("class","tdbutton");
//     desteditb.setAttribute("id","td-destedit-button");
//     let destdeleteb=document.createElement("button");
//     destdeleteb.setAttribute("class","tdbutton");
//     destdeleteb.setAttribute("id","td-destdelete-button");
    
//     destname.innerHTML=nameEl;
//     // destimage.innerHTML=ele.image;
//     destprice.innerHTML=priceEl;
//     destpackage.innerHTML=packageEl;
//     destcategory.innerHTML=catogaryEl;
//     // destrating.innerHTML=ele.rating;
//     destrate.innerHTML=rateEl;
//     desteditb.innerHTML="Edit";
//     destdeleteb.innerHTML="Delete";
//     let p=1;
//     destedit.addEventListener("click",function(){
//        let editdestination=document.getElementById("editdestination");
// let editprice=document.getElementById("editprice");
// let editpackage=document.getElementById("editpackage");
// let editcategory=document.getElementById("editcategory");
// let editrate=document.getElementById("editrate");
// let editdatabtn=document.getElementById("editdatabtn");
//      if(p==1){
//         maincont.style.gridTemplateColumns = "12rem auto 23rem";
//         rightsection.style.display="block";
//         newdatadiv.style.display="none";
//         // editdestination.value=ele.destination;
//         // editprice.value=ele.price;
//         // editpackage.value=ele.package;
//         // editcategory.value=ele.category;
//         // editrate.value=ele.rate;
//         editdestination.value=nameEl;
//         editprice.value=priceEl;
//         editpackage.value=packageEl;
//         editcategory.value=catogaryEl;
//         editrate.value=rateEl;
//         p=0;
//     } else if(p==0){
//       maincont.style.gridTemplateColumns = "12rem auto";
//           rightsection.style.display="none";
//           p=1;
//           // console.log(flag);
//   }
//     editdatabtn.addEventListener("click",(e)=>
//     { 
//         //  let name = document.getElementById("name").value;

//          postDataToAPI();
         
//         //  setTimeout(() => {
//            alert (`Data has been updated !`);
//            maincont.style.gridTemplateColumns = "12rem auto";
//             rightsection.style.display="none";
//           // window.location.href="./adminProductPage.html";
//         //  }, 1500);
//      })
// })
//     destdeleteb.addEventListener("click",()=>
//     {
//       fetch(`https://correct-api-destination.onrender.com/destination`)
//       .then(res => res.json())
//       .then((data) => {
             
//           data.forEach(element => {
//               if(element.name == locEl || element.location == locEl){
//                   addLoc(element.id)
//               }
//           });
          
//       })  
//   function addLoc(id)
//   {
//       fetch(`https://correct-api-destination.onrender.com/destination/${id}`)
//       .then(response => response.json())
//       .then(data => {
//         let tour =[]
//         data.place.filter((elm)=>
//         {
//           if(elm["name"]!=nameEl)
//           {
//             tour.push(elm)
//           }
          
//         })
//         data.place= tour
//         fetch(`https://correct-api-destination.onrender.com/destination/${id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//         })
//           .then(response => response.json())
//           .then(result => {
//           })
//           .catch(error => {
//             console.error( error);
//           });
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   } 
//     setTimeout(() => {
//       alert (`Data has been removed!`);
//       //window.location.href="./adminProductPage.html";
//     }, 1500);
//     })

//         function postDataToAPI(){
//             fetch(`https://correct-api-destination.onrender.com/destination`)
//             .then(res => res.json())
//             .then((data) => {
                   
//                 data.forEach(element => {
//                     // if(element.name == loc.value){
//                         addLoc(element.id)
//                     // }
//                 });
                
//             })
            
//         }
        // function addLoc(id);
        // {
        //     fetch(`https://correct-api-destination.onrender.com/destination/${id}`)
        //     .then(response => response.json())
        //     .then(data => {
        //       data.place.forEach((elm)=>
        //       {
                
        //         if( elm["name"]== editdestination.value)
        //       {
        //         elm["name"] = editdestination.value;
        //         // elm["images"] = imag.value;
        //         elm["catogary"]= editcategory.value;
        //         elm["price"] = editprice.value;
        //         // elm["info"] = info.value;
        //         elm["package"] = editpackage.value;
        //         elm["rate"]=editrate.value;
        //         return elm;
        //       }
        //       })
//               fetch(`https://correct-api-destination.onrender.com/destination/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                   'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//               })
//                 .then(response => response.json())
//                 .then(result => {
//                 })
//                 .catch(error => {
//                   console.error( error);
//                 });
//             })
//             .catch(error => {
//               console.error(error);
//             });
//         } 
//         //location.reload()
//         destedit.append(desteditb);
//         destbutton.append(destdeleteb);
//         drow.append( destname,destprice,destpackage,destcategory,destrate,destedit,destbutton);
//             return drow;
        
//        };














//        function CreateObject(name, price, package, catogary,rate){
//         this.name = name;
//         this.price = price;
//         this.package = package;
//         this.catogary = catogary;
//         this.rate = rate;
        
//     };
    
//     newdatabtn.addEventListener("click", (e)=>
//     {
        
    
//         postDataToAPI();
        
    
//         // setTimeout(() => {
//         //   window.location.href="./adminProductPage.html";
//         // }, 3000)
        
//     })
//     function postDataToAPI(){
        
//         let id;
//         fetch(`https://correct-api-destination.onrender.com/destination`)
//         .then(res => res.json())
//         .then((data) => {
              
//             data.forEach(element => {
//                 if(element.name == loc.value){
//                     addLoc(element.id)
//                 }
//             });
//         }) 
//     };
    
//     function addLoc(id)
//     {
//         fetch(`https://correct-api-destination.onrender.com/destination/${id}`)
//         .then(response => response.json())
//         .then(data => {
//           let name = document.getElementById("newdestination").value;
//           let price = document.getElementById("newprice").value;
//           let package = document.getElementById("newpackage").value;
//           let catogary = document.getElementById("newcatogary").value;
//           let rate = document.getElementById("newrate").value;
    
//           const newTourist = new CreateObject(name, price, package, catogary,rate);
          
//           data.tourist.push(newTourist);
//           //console.log(data.tourist)
//           fetch(`https://correct-api-destination.onrender.com/destination/${id}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//           })
//             .then(response => response.json())
//             .then(result => {
//               console.log(result.place);
//             })
//             .catch(error => {
//               console.error( error);
//             });
//         })
//         .catch(error => {
//           console.error(error);
//         });
//         alert (`Data has been added !`);
//         //window.location.href="./adminProductPage.html";
//     }
    
    
    