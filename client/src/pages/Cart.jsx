import "../app.css"
import {toast} from "react-toastify"
import axios from "axios";
import CartItem from "../components/CartItem"
import { useContext,useEffect } from "react";
import { GlobalContext } from "../context/globalcontext";

function CartPage() {

    const { cart, setCart, loading ,getCart} = useContext(GlobalContext);

    async function increaseQty(productId) {
        try {
            const res = await axios.put("http://localhost:5000/cart/increaseqty", { productId }, { withCredentials: true });
            toast.success(res.data.message);
            setCart(res.data.updatedCart);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    async function decreaseQty(productId) {
        try {
            const res = await axios.put("http://localhost:5000/cart/decreaseqty", { productId }, { withCredentials: true });
            toast.success(res.data.message)
            setCart(res.data.updatedCart);
            
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    async function removeItem(productId) {
        try{
            const res = await axios.delete("http://localhost:5000/cart/removeitem",{
                withCredentials:true,data:{productId}})  
                toast.success(res.data.message)         
            setCart(res.data.updatedCart);
        }catch(err){
            toast.error(err.response.data.message);
        }
    }

    const cartTotal = cart.reduce((acc, currentDoc) => {
        const itemValue = currentDoc.productId.price * currentDoc.quantity;
        return acc + itemValue
    }, 0)

    useEffect(()=>{
        getCart();
    },[]);

    if(loading){
        return( 
             <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
             </div> 
        )
    }

    return (
        <div className="cart-page">
            <h1 className="order-summary-header">Order Summary</h1>
            <div className="order-container">
                <div className="cart-items-box">
                    {cart.length === 0 ? (
                        <p>No items in cart.</p>
                    ) : cart.map((item) => (
                        <CartItem
                            key={item._id}
                            cartproduct={item}
                            increaseqty={() => increaseQty(item.productId._id)}
                            decreaseqty={() => decreaseQty(item.productId._id)}
                            removeitem={()=> removeItem(item.productId._id)}
                        />
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>order Summary</h3>
                    <p className="summary-total">Cart Total: {cartTotal}</p>
                    <button className="checkout-btn">Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage;