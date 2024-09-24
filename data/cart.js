export const cart=[]; 

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
}