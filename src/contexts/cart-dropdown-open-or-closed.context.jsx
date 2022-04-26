import {createContext, useState} from 'react';

export const CartDropdownOpenOrClosedContext = createContext({
    cartDropdownIsOpen: false,
    setCartDropdownIsOpen: () =>{}
});

export const CartDropdownOpenOrClosedProvider = ({children}) => {
    const [cartDropdownIsOpen, setCartDropdownIsOpen] = useState(false);
    const value = {cartDropdownIsOpen,setCartDropdownIsOpen};

    return (
    <CartDropdownOpenOrClosedContext.Provider value={value}>
        {children}
    </CartDropdownOpenOrClosedContext.Provider>
    )
}
