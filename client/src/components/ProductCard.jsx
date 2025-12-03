import {useContext,useEffect} from "react";
import { GlobalContext } from "../context/globalcontext";


function ProductCard({product}) {

  const {addToCart} = useContext(GlobalContext);

  return (
    <div className="col-md-4 col-lg-3 col-sm-6 mb-4 d-flex">
      <div className="card shadow-sm flex-fill">

        <img
          src={product.images[0]}
          className="card-img-top"
          alt={product.title}
          style={{ height: "220px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title text-truncate">{product.title}</h5>

          <p className="card-text mb-4">
            <span className="fw-bold fs-5">₹{product.price}</span>
          </p>

          <button
            className="btn btn-primary mt-auto w-100"
            onClick={() => addToCart(product._id)}
          >
            <i className="bi bi-cart-plus me-1"></i> Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
