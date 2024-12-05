import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import './Invoice.css'
import html2canvas from 'html2canvas'
import Footer from "../footer/Footer";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";
import { validateShipping } from "./Shipping";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const { shippingInfo, items: cartItems } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.authState);
  const {error:orderError} = useSelector(state=>state.orderState)
  const invoiceRef = useRef();
const navigate = useNavigate();
  
  
  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    
    if (orderError) {
      toast(orderError, {
        type: "error",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
  
    const order = {
      orderItems: cartItems,
      shippingInfo,
      totalPrice: calculateNetTotal(),
    };
  
    console.log("Order being created:", order);

    dispatch(createOrder(order));
    dispatch(clearOrderError())
    return;
  }, []);

const dispatch = useDispatch();
  const calculateTotal = () =>
    cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const calculateDiscount = () =>
    cartItems?.reduce((acc, item) => acc + (item.discount || 0) * item.quantity, 0) || 0;

  const calculateNetTotal = () => calculateTotal() - calculateDiscount();

  const downloadPDF = () => {
    // Get the invoice container
    const invoiceElement = invoiceRef.current;
  
    // Use html2canvas to capture a screenshot of the invoice content
    html2canvas(invoiceElement).then((canvas) => {
      // Get the base64 image data from the canvas
      const imgData = canvas.toDataURL("image/png");
  
      // Create a new jsPDF instance
      const pdf = new jsPDF("portrait", "mm", "a4");
  
      // Get the width and height of the image from the canvas
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
  
      // Save the generated PDF with the name 'invoice.pdf'
      pdf.save("invoice.pdf");
    });
    
    
  };
  
 
  return (
    <div>
        <div className="alert-box">
            <h3>Thank You For Your Enquiry. To Confirm the Order | <strong>Download the PDF and send</strong> . Gpay -
            8903359989 | Plesae Follow 
            8248450298 after the order.</h3>
        </div>
    <div className="invoice-container" ref={invoiceRef}>
      {/* Header */}
      <div className="invoice-header">
        <h1>SM CRACKERS</h1>
        <p>
          Address: 4/89 Vallalar Street, Abirami Nagar, Sennelur, Chennai 600056<br />
          
          Phone:  6381933039 /
          8248450298
        </p>
        
      </div>

      {/* Customer Details */}
      <div className="customer-details d-flex">
  
        <div className="left">
            <h5>Customer Details</h5>
        <p>To:</p>
        <p><strong>Name:</strong> {shippingInfo?.name || "Guest"}</p>
        <p><strong>Email:</strong> {user?.email || "Not Provided"}</p>
        <p><b>Phone:</b> {shippingInfo?.phoneNo || "not provided"}</p>
        <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>
        </div>
        <div className="invoice-details">
          <p><strong>Order No:</strong> {`2024KN${Math.floor(1000 + Math.random() * 9000)}`}</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Table */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item, index) => (
            <tr key={item.product}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${((item.discount || 0) * item.quantity).toFixed(2)}</td>
              <td>${(item.price * item.quantity - (item.discount || 0) * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="invoice-summary">
        <p><strong>Total Items:</strong> {cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0}</p>
        <p><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
        <p><strong>Discount:</strong> -${calculateDiscount().toFixed(2)}</p>
        <p><strong>Net Total:</strong> ${calculateNetTotal().toFixed(2)}</p>
      </div>

      {/* Footer */}
      <div className="invoice-footer">
       
        <p>__________________________________________________________________</p>
        <p>THANK YOU FOR SHOPPING WITH US!</p>
        <p>NO: 3/1232/20, Sri Thirupathi Nagar, Parapatti, Sivakasi-89</p>
      </div>

      {/* Download Button */}
    
    </div>
    <div className="button">
    <button onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
    <Footer/>
    </div>
  );
};

export default Payment;



