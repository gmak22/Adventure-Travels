
let firstname_list = document.querySelector(".firstname_list");
let email_list = document.querySelector(".email_list");
let new_password_list = document.querySelector(".new_password_list");
let form = document.querySelector("form");



async function register() {
    try {
        let obj = {
            "username": firstname_list.value,
            "password": new_password_list.value,
            "email": email_list.value,
        }
        let res = await fetch("https://adventure-travels-json-server.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
        let data = await res.json();
        console.log(data);
        let result = check(data)
        if (result) {
            Swal.fire({
                icon: 'success',
                text: `REGISTATION IS SUCCESSFUL`,
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ENTER CURRECT CREDIENCIAL',

            })
        }
    }
    catch (error) {
        console.log(error)
    }
}

function check(size) {
    if (size) {
        return true;
    } else {
        return false;
    }
}

form.addEventListener("submit", (el) => {
    el.preventDefault();
    fetchURL()
    
})

async function fetchURL() {
    try {
        let res = await fetch("https://adventure-travels-json-server.onrender.com/register");
        let data = await res.json();
        console.log(data);
        let result=checkuser(data);
        if (result==false) {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'USER IS ALREADY REGISTER',
                // window.location.href="./../Sign-In/Login.html";

            })
            // window.location.href="./../Sign-In/Login.html";

        } else {
            register();
        }
    }
    catch (error) {
        console.log(error)
    }
}

function checkuser(data){
    for(let i=0; i<data.length; i++){
        if(data[i].username==firstname_list.value||data[i].email==email_list.value){
           
             return false;
             
            
        }
    }
    return true;

}
let username1=JSON.parse(localStorage.getItem("username"))||""
let loginuser=document.querySelector(".username")
function signout(user){
    if(user.length==0){
        console.log(username1.length,"#");
        loginuser.innerHTML="Login";
       }else{
           console.log(username1,"@");
           loginuser.innerHTML=(user.toUpperCase());
       }
}
signout(username1)