import {useState, useContext} from 'react'
import {Button, Container, Navbar, Modal} from 'react-bootstrap'
import { CartContext } from '../CartContext'
import { getProductData } from '../ProductsStore';
import CartProduct from './CartProduct';

function NavbarComponent() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cart = useContext(CartContext);
    const productsCount = cart.item.reduce((sum, product)=> sum + product.quanity, 0);
  return (
    <>
    <Navbar expand = "sm">
        <Navbar.Brand href="/"> Ecom Store</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
        <Button onClick={handleShow} className="btn btn-success btn-lg float-right" > Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
    </Navbar>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
        <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {  productsCount > 0 ?
            <>
            {cart.item.map((currentProduct, idx) => (
             <CartProduct key= {idx} id={currentProduct.id} 
             quanity = {currentProduct.quanity}></CartProduct>
            ))}
            
            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
            <Button variant='success'> Purchase items </Button>
            </>
            : <h1>No ITEMS</h1>
            }
        </Modal.Body>
    </Modal>
    </>
  )
}

export default NavbarComponent;