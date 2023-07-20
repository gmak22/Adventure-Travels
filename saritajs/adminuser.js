
let url=`https://adventure-travels-json-server.onrender.com/register`;
let tbody=document.querySelector("tbody");
let k=0;
window.addEventListener("load",function(){
    fetcheddata(url);
});

function fetcheddata(url){
    let data=fetch(url).then(function(res){
        return res.json();
    }).then(function(list){
        k=list;
        display(list);
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
edit.append(editb);
button.append(deleteb);
row.append(username,usermail,userpass,usergender,edit,button);
    return row;
}



let totaluser=document.getElementById("totaluser-count");
console.log(k);
let totalMale=document.getElementById("totalMale-count");



