import {cart} from "../data/cart.js"; //.. means go up one level in the directory structure
let productsHTML=""; //creating a variable to store the html of all the products

//looping through the products
products.forEach((product) => {
  productsHTML += `
   <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars *10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `; //generating html for each product and storing it in a variable called html 
});

document.querySelector(".js-products-grid").innerHTML = productsHTML; //displaying the html of all the products in the products grid
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId= button.dataset.productId; //getting the product name from the data attribute of the button
      let matchingItem;

      cart.forEach((item)=>{
        if(item.productId===productId){ 
          matchingItem=item; //checking if the product is already in the cart
        }
      });
      if(matchingItem){
        matchingItem.quantity++; //if the product is already in the cart, increase the quantity
      }
      else{
        cart.push({
          productId: productId,  //if the product is not in the cart, add it to the cart
          quantity: 1
        });
      };

      let cartQuantity=0;
        cart.forEach((item)=>{
          cartQuantity+=item.quantity; //calculating the total quantity of items in the cart
        });

        document.querySelector('.js-cart-quantity').textContent=cartQuantity; //displaying the total quantity of items in the cart

    }); 
  });
