import {createContext, useEffect, useState} from 'react';

const returnExistingItem = (cartItems,id)=>{
    return cartItems.find(i => i.id === id);
}
 
const returnArrayWithIncreasedQuantityOfProduct = (array,existingItem)=>{
    return [...array.map(i => 
        existingItem.id === i.id ? {...i, quantity: ++i.quantity }: i
        )];
}

const addCartItem = (cartItems,productToAdd) => {
    let newItemsSet = [];
    // find if cartItems contains productToAdd
    const existingItem = returnExistingItem(cartItems,productToAdd.id);
    // if found, increment quantity
    if(existingItem){
        newItemsSet =returnArrayWithIncreasedQuantityOfProduct(cartItems,
            existingItem);
    } else {
        const newProduct = {...productToAdd, quantity: 1};
        newItemsSet = [...cartItems,newProduct];
    }

    // return new array with modified cartItems/ new cart item
    return newItemsSet;
}



const decreaseQuantityOfProduct = (cartItems,itemId)=>{
    let newItemsSet = [];

    const existingItem = returnExistingItem(cartItems, itemId);

    if(existingItem.quantity === 1) return deleteProductFromItems(cartItems,itemId);

    if(existingItem){
        newItemsSet = cartItems.map(i =>{
                return (existingItem.id === i.id &&
                    i.quantity > 0 )? {...i, quantity: i.quantity-1}:i
            }
        );
            
        return newItemsSet;
    }else {
        return null;
    }
}

const deleteProductFromItems = (cartItems, itemId) => {
    let newItemsSet = [];

    const existingItem = returnExistingItem(cartItems, itemId);

    if(existingItem){
        newItemsSet = cartItems.filter(i => i.id !== itemId);
   
        return newItemsSet;
    }

    return null;
}
export const CartContext = createContext({
    cartDropdownIsOpen: false,
    setCartDropdownIsOpen: () =>{},
    cartItems: [],
    addItemToCart: () => {},
    productsQuantity: 0,
    increaseProductQuantity: ()=>{},
    decreaseProductQuantity: ()=>{},
    deleteProduct: ()=>{},
});

export const CartProvider = ({children}) => {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalProductsQuantity,setTotalProductsQuantity] = useState(0);
    const [totalPrice ,setTotalPrice] = useState(0);

    useEffect(()=>{
        const newProductsQuantity = cartItems.reduce((total,cartItem)=>
                                    total+cartItem.quantity,0);
                                    
        setTotalProductsQuantity(newProductsQuantity);
    },[cartItems]);

    useEffect(()=>{
        const newTotalPrice = cartItems.reduce((total,cartItem)=>
                                    total+(cartItem.price*cartItem.quantity), 0);
                                   
        setTotalPrice(newTotalPrice);
    },[cartItems]);

    const resetCartItemsIfValid = (newSetOfProducts)=>{
        if(newSetOfProducts !== null){
            setCartItems(newSetOfProducts);
        }
    }

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const decreaseProductQuantity = (itemId) => {
        const newSetOfProducts =decreaseQuantityOfProduct(cartItems,itemId);
        resetCartItemsIfValid(newSetOfProducts);
    }

    const deleteProduct = (itemId)=>{
        const newSetOfProducts = deleteProductFromItems(cartItems,itemId);
        resetCartItemsIfValid(newSetOfProducts);
    }

    const value = {cartIsOpen,setCartIsOpen,addItemToCart,cartItems,
                    totalProductsQuantity,totalPrice,
                decreaseProductQuantity,deleteProduct};

    return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
    )
}
