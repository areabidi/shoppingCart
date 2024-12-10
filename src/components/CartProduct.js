import Button from 'react-bootstrap/Button';
import { CartContext } from '../CartContext';
import { useContext } from 'react';
import { getProductData} from '../ProductsStore';


function CartProduct(props){
    const cart = useContext(CartContext)
    const id = props.id;
    const quanity = props.quanity;
    const productData = getProductData(id);

    return(
        <>
        <h3>{productData.title}</h3>
        <p>{quanity} total</p>
        <p>${(quanity * productData.price).toFixed(2)}</p>
        <Button size="sm" onClick={() => cart.deleteFromCart(id)}> Remove </Button>
        <hr></hr>
        
        </>
    )

}
export default CartProduct;
