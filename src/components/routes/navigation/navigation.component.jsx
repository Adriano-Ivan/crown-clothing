import { Outlet,Link } from "react-router-dom";
import {Fragment} from 'react';
import {ReactComponent as CrownLogo} from '../../../assets/crown.svg'
import './navigation.styles.scss';

const Navigation =()=>{
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
                <Link class='nav-link' to='/auth'>
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet/>
      </Fragment>
    )
}

export default Navigation;