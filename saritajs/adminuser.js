
let urldata=`https://adventure-travels-json-server.onrender.com/register`;
let tbody=document.querySelector("tbody"); 
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
            if(list[i].gender=="male"){
         d++;
            }
        }

        totalMale.innerHTML=d;
        totalfemale.innerHTML=k-d;
        let g=d/k*100;
malepercent.innerHTML=`+${Math.round(g)}%`;
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
    let row=document.createElement("tr");
let username=document.createElement("td");
let userpass=document.createElement("td");
let usermail=document.createElement("td");
let usergender=document.createElement("td");
let edit=document.createElement("td");
let button=document.createElement("td");
let editb=document.createElement("button");
editb.setAttribute("class","tdbutton");
editb.setAttribute("id","td-edit-button");
let deleteb=document.createElement("button");
deleteb.setAttribute("class","tdbutton");
deleteb.setAttribute("id","td-delete-button");

username.innerHTML=ele.username;
userpass.innerHTML=ele.password;
usermail.innerHTML=ele.email;
usergender.innerHTML=ele.gender;
editb.innerHTML="Edit";
deleteb.innerHTML="Delete";

edit.addEventListener("click",function(){
    editeddata(ele);
})
deleteb.addEventListener("click",function(){
    deletefn(ele.id);
})
edit.append(editb);
button.append(deleteb);
row.append(username,usermail,userpass,usergender,edit,button);
    return row;
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
let editname=document.getElementById("editname");
let editemail=document.getElementById("editemail");
let editpass=document.getElementById("editpass");
let editgender=document.getElementById("editgender");

function editeddata(ele){
     if(p==1){
        maincont.style.gridTemplateColumns = "12rem auto 23rem";
        rightsection.style.display="block";
        newdatadiv.style.display="none";

        editid.value=ele.id;
        editname.value=ele.username;
        editemail.value=ele.email;
        editpass.value=ele.password;
        editgender.value=ele.gender;
        p=0;
    }
    // else if(p==0){
    //     maincont.style.gridTemplateColumns = "12rem auto";
    //     rightsection.style.display="none";
    //     p=1;
    // }  
}

let newdatabtn=document.getElementById("newdatabtn");
newdatabtn.addEventListener("click",newdatafn);

let newdataname=document.getElementById("newdataname");
let newdataemail=document.getElementById("newdataemail");
let newdatapass=document.getElementById("newdatapass");
let newdatagender=document.getElementById("newdatagender");

function newdatafn(){
    let newd={
        username:newdataname.value,
        email:newdataemail.value,
        password:newdatapass.value,
        gender:newdatagender.value,
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
}

let editdatabtn=document.getElementById("editdatabtn");
editdatabtn.addEventListener("click",editdatafunc);

function editdatafunc(){
    let editd={
        username:editname.value,
        email:editemail.value,
        password:editpass.value,
        gender:editgender.value,
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
}



// Experiment of table



let getallusersdata=document.getElementById("allusersdata");
getallusersdata.addEventListener("click",function(){
    document.getElementById("destinationdatadiv").style.display="none";
    document.getElementById("alluserdatadiv").style.display="block";
  
})



let destinationdata=`https://correct-api-destination.onrender.com/destination`;

let getalldestinationdata=document.getElementById("alldestinationdata");
getalldestinationdata.addEventListener("click",function(){
    window.location.href="./adminproduct.html";
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
