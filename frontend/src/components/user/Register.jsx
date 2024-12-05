import { useEffect, useState } from 'react'
import Footer from '../footer/Footer'
import './register.css'
import {useDispatch, useSelector} from 'react-redux'
import {clearAuthError, register} from '../../actions/userAction'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function Register(){
const [userData,setUserData] = useState({
    name: "",
    email: "",
    password: ""
});
const navigate = useNavigate();
const dispatch = useDispatch();
const {loading,error,isAuthenticated} =useSelector(state=>state.authState)

const submitHandler = (e) =>{
e.preventDefault();
const formData = new FormData();
formData.append('name',userData.name)
formData.append('email',userData.email)
formData.append('password',userData.password);
dispatch(register(formData))
}
useEffect(()=>{
    if(isAuthenticated){
        navigate('/')
        return
    }
    if(error){
        toast(error,{
            type:'error',
            onOpen:()=>{dispatch(clearAuthError)}
        })
    }
},[isAuthenticated,error, dispatch, navigate])

const onChange = (e) =>{
    setUserData({...userData, [e.target.name]:e.target.value})
}

    return(
      <div>
        <div className="register_page">
        <div className="reg_details">
            <h1> REGISTRATION FORM</h1>
            <form onSubmit={submitHandler} encType='application/json'>
       <div className="regi">
        <div className="names">
            <h4>Name</h4>
            <input name='name' type="text" onChange={onChange} placeholder="Name"/>
        </div>
           <div className="emails">
            <h4>E-Mail</h4>
            <input name='email' type="email" onChange={onChange} placeholder="E-Mail " width="100%"/>
            </div>
               <div className="passwords">
                <h4>Password</h4>
                <input name='password' type="password" onChange={onChange}  placeholder="Password"/>
               </div>
               <button type='submit' className='btn btn-block' disabled={loading}>Submit</button>
        </div>
     </form>
        <div className=' text-center d-flex flex-column  justify-content-center align-items-center mt-3'>
    <a href="/Login" className=" text-center" > Already Have an account ? Login</a>
   </div>
                
               
        </div>
         
        <div className="reg_image">
            <img src="../images/register.jpg" alt="img"/>
        </div>
    </div>
    <Footer/>
    </div>
    )
}