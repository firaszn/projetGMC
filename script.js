let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

document.querySelector('#login-btn').onclick = () =>{
  document.querySelector('.login-form-container').classList.toggle('active');
}

document.querySelector('#close-login-form').onclick = () =>{
  document.querySelector('.login-form-container').classList.remove('active');
}



document.querySelector('.home').onmousemove = (e) =>{

  document.querySelectorAll('.home-parallax').forEach(elm =>{

    let speed = elm.getAttribute('data-speed');

    let x = (window.innerWidth - e.pageX * speed) / 90;
    let y = (window.innerHeight - e.pageY * speed) / 90;

    elm.style.transform = `translateX(${y}px) translateY(${x}px)`;

  });

};


document.querySelector('.home').onmouseleave = (e) =>{

  document.querySelectorAll('.home-parallax').forEach(elm =>{

    elm.style.transform = `translateX(0px) translateY(0px)`;

  });

};








var swiper = new Swiper(".featured-slider", {
  grabCursor: true,
  centeredSlides: true,  
  spaceBetween: 20,
  loop:true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});





let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector('#close-cart');

/* open cart */
cartIcon.onclick = () => {
  cart.classList.add("active");
}

/* close cart */
closeCart.onclick = () => {
  cart.classList.remove("active");
}

// Close cart when tapping outside
document.addEventListener('click', (event) => {
  const target = event.target;
  if (!cart.contains(target) && target !== cartIcon) {
    cart.classList.remove("active");
  }
});



 /* cartWorking */
 if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

 /* making function */
 function ready(){
    /* remove items from cart */
    var removeCartButtons = document.getElementsByClassName("cart-remove");
   // console.log(removeCartButtons);
    for(var i = 0 ;i<removeCartButtons.length ;  i++  ){
        var button = removeCartButtons[i] ; 
        button.addEventListener("click" , removeCartItem);
    }
     /* quantite change */
     var quantityInputs = document.getElementsByClassName("cart-quantity");
     for(var i = 0 ; i< quantityInputs.length ;  i++  ){
         var input = quantityInputs[i]; 
         input.addEventListener("change", quntityChanged);
     }
      /* add to cart */
      var addCart = document.getElementsByClassName("add-cart");
      for(var i = 0 ; i< addCart.length ;  i++  ){
        var button = addCart[i];
        button.addEventListener("click" , addCartClick);
      }
       /* buy button work */
       document.getElementsByClassName("btn-buy")[0].addEventListener("click",buybuttonclick);

}

   function removeCartItem(event){
        var buttonClicked = event.target ;
        buttonClicked.parentElement.remove();
        updatetotal();
  
    }
    function buybuttonclick(){
      alert("your order is placed");
      var cartContent = document.getElementsByClassName('cart-content')[0];
      while(cartContent.hasChildNodes()){
          cartContent.removeChild(cartContent.firstChild);
      }
      updatetotal();
     }
     /* qunatity change */
     function quantityChanged(event){
        
      var input = event.target;
      if  (isNaN(input.value) || input.value <= 0){
          input.value = 1 ;
      }    
      updatetotal();
  }




     /* add to cart */
     function  addCartClick(event){
        var button = event.target;
        var shopproduct = button.parentElement;
        console.log( shopproduct)
        var title = shopproduct.getElementsByClassName("product-tiltle")[0].innerText;
         var price = shopproduct.getElementsByClassName("price")[0].innerText; 
         var image = shopproduct.getElementsByClassName("product-img")[0].src;

         addProductsToCart(title, price, image);
       
   
        updatetotal();
       }
       function addProductsToCart(title, price, image ) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add('cart-box');
        var cartItems = document.getElementsByClassName('cart-content')[0];
        var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
        for (var i = 0; i < cartItemsNames.length; i++) {
          if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to the cart");
            return;
          }
        }
      
        var cartBoxContent = `
          <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <img src="${image}" alt="" class="product-img">

            <input type="number" value="1" class="cart-quantity">
          </div>
          <i class='bx bxs-trash-alt cart-remove'></i>
        `;
      
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
      }
      
      



   /* updeta totale */
   function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i = 0 ; i< cartBoxes.length ;  i++  ){
        var cartBox = cartBoxes[i] ; 
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElemnt = cartBox.getElementsByClassName("cart-quantity")[0];
       var price = parseFloat(priceElement.innerText.replace("$",""));
        var  quantity = quantityElemnt.value ;
          total = total + (price * quantity) ;
    } 
          /* if price contain some cents value  */
           total = Math.round (total * 100) /100; 


          document.getElementsByClassName('total-price')[0].innerText = "$" + total ;
    
}



    












const nom = document.getElementById("nom");
const email = document.getElementById("email");
const tel = document.getElementById("tel");

const submitBtn = document.getElementById("submitBtn");
const nomErreur = document.getElementById("nomErreur");
const emailErreur = document.getElementById("emailErreur");
const telErreur = document.getElementById("telErreur");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (isEmpty(nom.value)) {
    nomErreur.textContent = "Veuillez saisir un nom.";
  } else {
    nomErreur.textContent = "";
  }

  if (email.validity.typeMismatch || isEmpty(email.value)) {
    errorMessage(emailErreur, "Veuillez saisir une adresse email valide.");
  } else {
    errorMessage(emailErreur, "");
  }

  if (tel.value.length < 8 || isEmpty(tel.value)) {
    telErreur.textContent = "Le numéro de téléphone doit contenir au moins 8 chiffres.";
  } else {
    telErreur.textContent = "";
  }
});

function isEmpty(value) {
  return value.length === 0;
}

function errorMessage(input, msg) {
  input.textContent = msg;
}








































