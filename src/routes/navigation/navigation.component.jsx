import { Outlet,Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {Fragment, useContext} from 'react';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context";
import { CartContext } 
from "../../contexts/cart.context";
import './navigation.styles.scss';
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation =()=>{
    const {currentUser} = useContext(UserContext);
    const {cartIsOpen} =useContext(
        CartContext);
 
    return (
      <Fragment>
        <div className='navigation'>
            <Link class='logo-container' to='/'>
                <CrownLogo class='logo'/>
            </Link>
            
            <div class='nav-links-container'>
                <Link class='nav-link' to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ?(
                        <span class='nav-link' onClick={signOutUser}>SIGN OUT</span>)
                        : (<Link class='nav-link' to='/auth'>
                        SIGN IN
                        </Link>
                    )
                }

                <CartIcon/>
            </div>

           {cartIsOpen && <CartDropdown/>}
        </div>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;