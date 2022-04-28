import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout-row.styles.scss';

const CheckoutRow = ({item}) =>{
    
    const {decreaseProductQuantity,increaseProductQuantity,
    deleteProduct,addItemToCart} =useContext(
        CartContext
    );

    const decreaseQuantity = () =>  decreaseProductQuantity(item.id);
    
    const increaseQuantity = () => addItemToCart(item);

    const removeProduct = () => deleteProduct(item.id);

    return (
        <tr className='checkout-item-container'>
            <td className='image-container'>
                <img src={item.imageUrl}/>
            </td>
            <td className='name'>
                {item.name}
            </td>
            <td className='quantity'>
                <span className='arrow' 
                onClick={decreaseQuantity}> &#10094; </span>
                <span className='value'>{item.quantity}</span>
                <span className='arrow'
                onClick={increaseQuantity}> &#10095;</span>
            </td>
            <td className='price'>
                ${item.price}
            </td>
            <td>
                <div className='remove-button' onClick={removeProduct}>&#10005;</div>
            </td>
        </tr>
    )
}

export default CheckoutRow;