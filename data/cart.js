export let cart= localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")): //if there is a cart in local storage, get it else get the default cart

[
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  }
]; 

const saveToStorage= ()=>{
  localStorage.setItem("cart", JSON.stringify(cart)); //save the cart to local storage
}

export const addtoCart=(productId)=>{ 
  let matchingItem;

      cart.forEach((cartItem)=>{
        if(cartItem.productId===productId){ 
          matchingItem=cartItem; //checking if the product is already in the cart
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
  saveToStorage();
}



export const deleteFromCart=(productId)=>{
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem); //if the product is not the one to be deleted, add it to the new cart
    };
  });
  cart=newCart;
  saveToStorage();
};