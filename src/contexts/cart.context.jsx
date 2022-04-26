import {createContext, useEffect, useState} from 'react';

const addCartItem = (cartItems,productToAdd) => {
    let newItemsSet = [];
    // find if cartItems contains productToAdd
    const existingItem = cartItems.find(i => i.id === productToAdd.id);
    // if found, increment quantity
    if(existingItem){
        newItemsSet =[...cartItems.map(i => 
            existingItem.id === i.id ? {...i, quantity: ++i.quantity }: i
            )];
    } else {
        const newProduct = {...productToAdd, quantity: 1};
        newItemsSet = [...cartItems,newProduct];
    }

    // return new array with modified cartItems/ new cart item
    return newItemsSet;
}

export const CartContext = createContext({
    cartDropdownIsOpen: false,
    setCartDropdownIsOpen: () =>{},
    cartItems: [],
    addItemToCart: () => {},
    productsQuantity: 0,
});

export const CartProvider = ({children}) => {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [productsQuantity,setProductsQuantity] = useState(0);

    useEffect(()=>{
        const newProductsQuantity = cartItems.reduce((total,cartItem)=>
                                    total+cartItem.quantity,0);
        setProductsQuantity(newProductsQuantity);
    },[cartItems]);

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const value = {cartIsOpen,setCartIsOpen,addItemToCart,cartItems,
                    productsQuantity};

    return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
    )
}
