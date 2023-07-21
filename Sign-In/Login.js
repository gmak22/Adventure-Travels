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


function checkuser(user){
    for(let i=0; i<user.length; i++){
        if(user[i].username===username.value&&user[i].password===password.value){
            localStorage.setItem("username",JSON.stringify(username.value));
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