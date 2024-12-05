
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router,Route ,Routes} from 'react-router-dom';
import Home from './Pages/Home/Home';
// import Product from './Pages/products/Product'
import {HelmetProvider} from 'react-helmet-async'
import Cracker from './components/product-section/Cracker';
import Contact from './components/contact-us/contact';
import {ToastContainer} from 'react-toastify'
import ProductSearch from './Pages/products/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import About from './components/about-page/About';
import store from './components/store'
import { useEffect } from 'react';
import { loadUser } from './actions/userAction';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ProtectedRoute from './components/route/ProtectedRoute';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import Payment from './components/cart/Payment';
import OrderList from './components/admin/OrderList';


function App() {
useEffect(()=>{
  store.dispatch(loadUser)
})

  return (
    <Router>
     <div className="App">
      <HelmetProvider>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/search' element={<ProductSearch/>}/>
        <Route path='/About' element={<About/>}/>
      <Route path ='/' element ={ <Home/>} />
      <Route path='/search/:keyword' element={<ProductSearch/>}/>
      <Route path='/products' element ={<Cracker/>}/>
      <Route path='/contact' element = { <Contact/> }/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/password/reset/:token' element={<ResetPassword/>}/>
      <Route path = '/Mycart' element={<Cart/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path = '/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
      <Route path = '/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
      <Route path='/admin/orders' element={<OrderList/>}/>
      
        <Route path ='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
        <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute> } />
        <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } />
       </Routes>
      </HelmetProvider>
       </div>
    </Router>
  );
}

export default App;
