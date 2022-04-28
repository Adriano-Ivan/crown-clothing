import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutRow from "../checkoutRow/checkout-row.component";
import './checkout.styles.scss';

const Checkout = () => {
    const {cartItems} = useContext(CartContext);
    const {totalPrice} = useContext(CartContext);

    return (
        <section className='checkout-container'>
            <table > 
                <thead >
                    <tr className='checkout-header'>
                        <th >Product</th>
                        <th >Description</th>
                        <th > Quantity</th>
                        <th >Price</th>
                        <th >Remove</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        cartItems.map((item) => 
                            <CheckoutRow key={item.id} item={item}/>
                        )
                    }
                </tbody>
            </table>
            <div className='total'>
                Total price: {totalPrice}
            </div>
        </section>
    )
}

export default Checkout;