let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

// targetting the input user data
const username = document.getElementById("user-name");
const email = document.getElementById("user-email");
const phone = document.getElementById("user-phone");

const addUser = (e)=>{
    e.preventDefault();
    const reqBody ={
       "clientname":username.value,
       "email":email.value,
       "mobile":phone.value
    }

    axios.post("http://localhost:3000/client",reqBody).then((res)=>{
      alert(res.data.message);
      username.value = "";
      email.value = "";
      phone.value = ""
    })
}

const buttonSubmit = document.getElementById("btn-submit");
buttonSubmit.addEventListener("click",addUser);