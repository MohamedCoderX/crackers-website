import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import CheckoutSteps from "./CheckoutSteps"
import MetaData from "../../Pages/Home/MetaData"
import { validateShipping } from "./Shipping"

export default function ConfirmOrder(){
  const {shippingInfo,items:cartItems} = useSelector(state=>state.cartState)
  const {user} = useSelector(state=>state.authState)
  const itemsPrice = cartItems.reduce((acc, item)=> (acc + item.price * item.quantity),0);
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2)
    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

  const navigate = useNavigate();

  
  return(
<Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-center">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {shippingInfo.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                            <Fragment>
                                <div className="cart-item my-1">
                                    <div className="row align-items-center">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="100" width="70" />
                                        </div>

                                        <div className="col-5 col-lg-6 text-capitalize">
                                           <h6>{item.name}</h6>
                                        </div>


                                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                            <p>{item.quantity} x &#x20B9;{item.price} = <b>&#x20B9;{item.quantity * item.price}</b></p>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        )
                    
                        )
                    
                    }
              
              
                

            </div>
			
            <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">&#x20B9;{itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">&#x20B9;{shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">&#x20B9;{taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">&#x20B9;{totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
            </div>
        </div>
        </Fragment>
    )
}