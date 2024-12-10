import {createContext, useState} from "react";
import {productsArray, getProductData} from "./ProductsStore"

//the idea of useContext is to pass info between multiple components
//without having to pass them as prop between each compoent
//we can give access to all data via useContext

//import { getProviders } from "next-auth/react";
//import { getAnnotationFromOptions } from "mobx/dist/internal";

//context(cart, addtocart, removeCart,...)
//provider -> gives React app access to all the things in the context varibles and methods
//  this way where ever provider is implemented the will have access to these

//when we add export we cann give our application access to thecontext
export const CartContext = createContext({
    //cart will have items this can be a arry
    item:[],
    //we can do not define functions in a context instead we are saying that 
    //we can define a unction for  getProductQuantity( we will define it below)
    //Context just says a function houl be hre
    getProductQuanity: () => {},
    addOneToCart:()=>{},
    removeOneFromCart:() => {},
    deleteFromCart:() => {},
    getTotalCost:() => {}
});


//provider -> gives React app access to all the things in the context varibles and methods
//the idea of children is that it is atag, whaever isd in thsi tag will have access to car  provider
//<cartprovider> app tags</cartprovider>
export function CartProvider({children}){
    //state specific to out provider
    const [cartProducts, setCartProducts] = useState([]);
    //within our cart we want to put in 
    //{id: , quanity: }
    function getProductQuanity(id){
        //if you find a product with a certain id we want to find its qauntity
        const quanity = cartProducts.find(product=> product.id ===id)?.quanity;
        //if .find gets an undefined obj, meaning no prodaut with this id
        if(quanity=== undefined){
                return 0;
            }
        return quanity;
    }

    function addOneToCart(id){
        const qauntity = getProductQuanity(id);
        console.log(getProductQuanity(id))
        if(qauntity === 0){//product is not in the cart
        setCartProducts(
        [
            ...cartProducts,
            {
                id:id,
                quanity: 1
            }])

            }
        
        else{ //product is in the cart
            setCartProducts(
                cartProducts.map(
                    product => 
                    product.id === id                          //if condition (turninary statement)
                    ? {...product, quanity: product.quanity+1}   //if statement is true
                    : product                                   // if statement is false

                )
            )
        }
    }

    function deleteFromCart(id){
      //[] if an obj meets a condition, add the obj to arry
      setCartProducts(
        cartProducts => cartProducts.filter(currentProduct=> {
            return currentProduct.id != id;
        })
      )  
    }

    function removeOneFromCart(id){
        const quanity = getProductQuanity(id);
        if(quanity==1){
            deleteFromCart(id);
        }
        else{
            setCartProducts(
                cartProducts.map(
                    product=> product.id=== id
                    ? {...product, quanity: product.quanity -1}
                    : product
                )
            )
        }
    }

    function getTotalCost(){
        let totalCost = 0;
        cartProducts.map((cartItem)=> {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quanity );
        });
        return totalCost;
    }
    

    //Note: 
    const contextValue ={
        //properties
        //cartPro is empty item: [], => item: cartProducts
        item: cartProducts,
        getProductQuanity, 
        addOneToCart, 
        removeOneFromCart, 
        deleteFromCart, 
        getTotalCost
    }
 

    return (
        //value here is a prop to specify teh data/functions we want 
        //to share with the app
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )

}
export default CartProvider;