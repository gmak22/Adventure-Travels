let urldata=`https://admin-update-api.onrender.com/admin`;
let tbody=document.querySelector("tbody"); 
let malepercent=document.getElementById("malepercent");
let femalepercent=document.getElementById("femalepercentage");
window.addEventListener("load",function(){
    fetcheddata(urldata);
});

function fetcheddata(url){
    let data=fetch(url,{
       method:'GET', 
    }).then(function(res){
        return res.json();
    }).then(function(list){
        display(list);
       let k=list.length;
        let d=0;
        totaluser.innerHTML=k;
        for(let i=0;i<list.length;i++){
            if(list[i].category=="Temple"){
         d++;
            }
        }

        totalMale.innerHTML=d;
        totalfemale.innerHTML=k-d;
        let g=d/k*100;
        g=Math.floor(g);
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
    let destprice=document.createElement("td");
let destpackage=document.createElement("td");
let destcategory=document.createElement("td");
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
    destprice.innerHTML=ele.price;
    destpackage.innerHTML=ele.package;
    destcategory.innerHTML=ele.category;
    destrate.innerHTML=ele.rate;
    desteditb.innerHTML="Edit";
    destdeleteb.innerHTML="Delete";
    
    destedit.addEventListener("click",function(){
        editeddata(ele);
    })
    destdeleteb.addEventListener("click",function(){
        deletefn(ele.id);
    })
    destedit.append(desteditb);
    destbutton.append(destdeleteb);
    drow.append( destname,destprice,destpackage,destcategory,destrate,destedit,destbutton);
        return drow;
}



let totaluser=document.getElementById("totaluser-count");

let totalMale=document.getElementById("totalMale-count");

let totalfemale=document.getElementById("totalFemale-count")
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


let editid=document.getElementById("editid");
let editname=document.getElementById("editdestination");
let editprice=document.getElementById("editprice");
let editpackage=document.getElementById("editpackage");
let editcategory=document.getElementById("editcategory");
let editrate=document.getElementById("editrate");


function editeddata(ele){
     if(p==1){
        maincont.style.gridTemplateColumns = "12rem auto 23rem";
        rightsection.style.display="block";
        newdatadiv.style.display="none";

        editid.value=ele.id;
        editname.value=ele.name;
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
editdatabtn.addEventListener("click",editdatafunc);

function editdatafunc(){
  let editd={
        name:editname.value,
        price:editprice.value,
        package:editpackage.value,
        category:editcategory.value,
        rate:editrate.value,
    }
    fetch(`${urldata}/${editid.value}`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(editd), 
      }).then(function(res){
        return res.json;
      }).then(function(list){
        fetcheddata(urldata);
      }).catch(function(error){
        console.log(error);
      })
      if(p==0){
            maincont.style.gridTemplateColumns = "12rem auto";
            rightsection.style.display="none";
            p=1;
        }  
}






let newdatabtn=document.getElementById("newdatabtn");
newdatabtn.addEventListener("click",newdatafn);

let newdestination=document.getElementById("newdestination");
let newprice=document.getElementById("newprice");
let newpackage=document.getElementById("newpackage");
let newcategory=document.getElementById("newcategory");
let newrate=document.getElementById("newrate");

function newdatafn(){
    let newd={
     name:newdestination.value,
     price:newprice.value,
     package:newpackage.value,
     category:newcategory.value,
     rate:newrate.value,
    }
    fetch(urldata,{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(newd), 
      }).then(function(res){
        return res.json;
      }).then(function(list){
        fetcheddata(urldata);
      if(flag==0){
            maincont.style.gridTemplateColumns = "12rem auto";
                rightsection.style.display="none";
                flag=1;
        }
        
      }).catch(function(error){
        console.log(error);
      })
      alert("New data added successfully");
}


function deletefn(id){
    fetch(`${urldata}/${id}`,{
        method:"DELETE", 
      }).then(function(res){
        return res.json;
      }).then(function(list){
        fetcheddata(urldata);
      }).catch(function(error){
        console.log(error);
      })
      alert("Deleted successfully");
}



// Experiment of table



let getallusersdata=document.getElementById("allusersdata");
getallusersdata.addEventListener("click",function(){
    document.getElementById("destinationdatadiv").style.display="none";
    document.getElementById("alluserdatadiv").style.display="block";
  
})



let destinationdata=`https://correct-api-destination.onrender.com/destination`;

let gotouser=document.getElementById("allusersdata");
gotouser.addEventListener("click",function(){
    window.location.href="./adminuser.html";
})

    let sideMenu=document.querySelector("aside");
let menubar=document.getElementById("sevenpx");
let closebtn=document.getElementById("close-btn");
menubar.addEventListener("click",function(){
  sideMenu.style.display='block';
});

closebtn.addEventListener("click",function(){
  sideMenu.style.display='none';
})



