import {cart,deleteFromCart} from "../data/cart.js"; 
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../data/deliveryOptions.js";

const today=dayjs();
const deliveryDate= today.add(7,"day").format("dddd, MMM D");
console.log(deliveryDate);

let cartSummaryHTML="";

cart.forEach((cartItem)=>{
const productId= cartItem.productId;
let matchingProduct;

products.forEach((product)=>{
  if(product.id===productId){
    matchingProduct=product;
  }
})

//creating the HTML for the cart summary
cartSummaryHTML+= ` 
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"g
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)} 
      </div>
    </div>
  </div>
`;
});

const deliveryOptionsHTML=(matchingProduct, cartItem)=>{ //matchingProduct is the product that is being displayed in the cart

let html =``;

  deliveryOptions.forEach((deliveryOptions)=>{
    const today=dayjs();
    const dateString= today.add(deliveryOptions.deliveryDays,"days").format("dddd, MMM D");
    const priceString= deliveryOptions.priceCents === 0 ? "FREE Shipping": $`${formatCurrency(deliveryOptions.priceCents)}`; //if the price is 0, display "FREE Shipping" else display the price
    html+=
    `
    <div class="delivery-option">
    <input type="radio"
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString}
      </div>
    </div>
  </div>
  `
  });

  return html;
}

document.querySelector(".js-order-summary").innerHTML=cartSummaryHTML;
document.querySelectorAll(".js-delete-link").forEach((deleteLink)=>{
deleteLink.addEventListener("click",()=>{
  const productId= deleteLink.dataset.productId; //getting the product id from the data attribute of the delete link
  deleteFromCart(productId); //deleting the product from the cart

  const container = document.querySelector(`.js-cart-item-container-${productId}`).remove(); //removing the product from the cart summary
  });
});