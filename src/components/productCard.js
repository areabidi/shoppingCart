import {Card, Button, Form, Row, Col} from 'react-bootstrap'
import {CartContext} from '../CartContext'
import { useContext } from 'react';
function ProductCard(props){ //props.product is the product we are selling
    const product = props.product;
    const cart = useContext(CartContext); //acess to cartContext
    const productQuanity = cart.getProductQuanity(product.id)
    console.log(cart.item);


return(
    <Card>
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text> ${product.price}</Card.Text>
            {productQuanity >0?
            <>
            <Form as={Row}>
                <Form.Label column="true" sm="6" > In Cart: {productQuanity}</Form.Label>
                <Col sm="6">
                <Button sm="6" className='mx-2'  onClick={() => cart.addOneToCart(product.id)}> + </Button>
                <Button sm="6" className='mx-2'  onClick={() => cart.addOneToCart(product.id)} className="mx-2"> - </Button>
                </Col>
            </Form>
            <Button variant="danger"  onClick={()=>cart.deleteFromCart(product.id)} >
                Remove from Cart
            </Button>
            </>
            : <Button variant = "primary" 
    onClick={()=>cart.addOneToCart(product.id)} > Add to Cart </Button>}
            
        </Card.Body>
    </Card>
)
}
export default ProductCard;