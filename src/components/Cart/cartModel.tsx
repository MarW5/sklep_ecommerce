import { CartItem } from './CartContext';

export const getCartItemsFromStorage = () =>{
    const itemsFromStorage = localStorage.getItem("shop_cart")
    if(!itemsFromStorage){
        return [];
    }
    try {
       const items = JSON.parse(itemsFromStorage);
       return items;
    } catch(err) {
        console.error(err);
        return [];
    }
}

export const setCartItemsToStorage = (cartItems: CartItem[])=>{
    localStorage.setItem('shop_cart', JSON.stringify(cartItems))
}