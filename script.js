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


// for opening the index.ejs



const reviewBtn = document.getElementById("revBtn");
reviewBtn.addEventListener("click",()=>{
    window.location.href = "http://localhost:3000/show"
})




// iterate through the object 




window.onload = async () => {
    
    const Targetdiv = document.getElementById("targetAdd");
    let apiCall = "http://localhost:3000/getReview";
    const data =  fetch(apiCall).then((res)=>{
        return res.json();
    })
    const resp = await data;
    const ReviewData = resp.message;
   
    ReviewData.forEach((data)=>{
        const childItem = document.createElement('div');
        childItem.className = "box1"
        childItem.innerHTML = `
                <img src="http://localhost:3000/images-client/${data.filePath}" alt="">
                <h3>${data.name}</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <div class="text">${data.review}</div>
            
        `;
        console.log(childItem);
        Targetdiv.appendChild(childItem);

    })
  };
  