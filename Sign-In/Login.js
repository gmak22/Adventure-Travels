let username = document.querySelector("#username");
let password = document.querySelector("#password")
async function fetchURL() {
    try {
        let res = await fetch("https://adventure-travels-json-server.onrender.com/register");
        let data = await res.json();
        console.log(data);
        let result=checkuser(data)
        if (result) {
            Swal.fire({
                icon: 'success',
                text: `LOGIN IS SUCCESSFUL`,
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
        console.log(error);
    }
}

let username1=JSON.parse(localStorage.getItem("username"))||"";
function checkuser(user){
    for(let i=0; i<user.length; i++){
        if(user[i].username===username.value&&user[i].password===password.value){
           let user=username.value
            localStorage.setItem("username",JSON.stringify(user));
            signout(user);
            return true;
        }
    }
    return false;
}

let proceed=document.querySelector(".process");
proceed.addEventListener("click",(el)=>{
    el.preventDefault();
    fetchURL(); 
    
})
let sign_out=document.querySelector(".sign-out");

let loginuser=document.querySelector(".username")
function signout(user){
    if(user.length==0){
        console.log(username1.length,"#");
        loginuser.innerHTML="Login";
        sign_out.innerHTML="";
       }else{
           console.log(username1,"@");
           loginuser.innerHTML=(user.toUpperCase());
       }
}
signout(username1)

sign_out.addEventListener("click",()=>{
    let user="";
    localStorage.setItem("username",JSON.stringify(user));
    signout(user)
})

