
import "../app.css"

function CartItem({cartproduct,increaseqty,decreaseqty,removeitem}) {

    return (<>
        <div className="cart-item">
            <div className="cartitem-img">
                <img src={cartproduct.productId.images[0]} alt={cartproduct.productId.title} ></img>
            </div>
            <div className="item-details">
                <h4 className="item-title">{cartproduct.productId.title}</h4>
                <p className="item-price">{cartproduct.productId.price}</p>
            </div>
            <div className="update-qty">
                <button className="qty-btn" onClick={increaseqty}>+</button>
                <span className="qty-number">{cartproduct.quantity}</span>
                <button className="qty-btn" onClick={decreaseqty}>-</button>
            </div>
            <div>
                <button onClick={removeitem}>Remove</button>
            </div>
        </div>
    </>
    )
}

export default CartItem;