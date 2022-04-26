import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartDropdownOpenOrClosedContext } 
from "../../contexts/cart-dropdown-open-or-closed.context";

const CartIcon = ()=>{
    const {cartDropdownIsOpen,setCartDropdownIsOpen} = 
    useContext(CartDropdownOpenOrClosedContext);

    const toggleCartIsOpen = ()=>setCartDropdownIsOpen(!cartDropdownIsOpen);
    return (
        <div onClick={toggleCartIsOpen} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon;