import React, { Fragment, useEffect } from "react";
import "./cracker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../actions/productActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../../Pages/products/Product";

const Crackerdisplay = () => {
  const dispatch = useDispatch();
  const { products,error } = useSelector(
    (state) => state.productsState
  );
  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProducts(null));
  }, [dispatch,error]);

  const navigate = useNavigate();

  return (
    <div>
      <div className="cracker-display" id="cracker-diplay">
        <h2>All Type Of Crackers</h2>
        <Fragment>
            <div className="cracker-display-list">
                {products && products.map(product => (
                    <Product key={product._id} product={product}/>
                    //<div className="cracker-list-item" key={product._id}>
                //     <div className="cracker-img">
                //         <img src={product.images[0].image} alt="img" />
                        
                //     </div>
                //     <div className="cracker-item-info">
                //         <div className="cracker-review">
                //             <p>{product.name}</p>

                //         </div>
                //         <p className="cracker-iem-desc">

                //             {product.description}
                //         </p>
                //         <p className="cracker-item-price">
                //             {product.price}
                //         </p>
                //        <div className="cart">
                //     <div className="add">
                //     <button> <i className="fa-solid fa-cart-shopping"></i> Add To Cart</button>
                //     </div>
                //        </div>
                //     </div>
                //
                ))}
            </div>
            </Fragment>
        <div className="view-all">
          <button onClick={() => navigate("/products")}>
            View All Crackers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crackerdisplay;
