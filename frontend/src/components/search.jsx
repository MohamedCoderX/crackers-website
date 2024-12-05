import { useEffect, useState } from "react";
import {  Link, useLocation, useNavigate } from "react-router-dom"

export default function Search(){
    const navigate = useNavigate();
    const location = useLocation();
const [keyword,setKeyword] = useState("");
    const searchHandler = (e) =>{
        e.preventDefault(null);
        navigate(`/search/${keyword}`)
    }
   const clearKeyword = ()=>{
    setKeyword("");
   }
   useEffect(()=>{
    if(location.pathname === '/search'){
        clearKeyword();
    }
},[location])
   
    return(
        <form onSubmit={searchHandler} >
        <div className="d-flex justify-content-center w-50 align-items-center mb-4 mx-auto scsc flex-wrap" >
        <div className="d-flex w-100">
        <input type="text" id="search_field " className="form-control" placeholder="Enter Cracker Name"value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} />
       
       <button className=" pt-2 "><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div className="input-group-append mt-1">
        {location.pathname.startsWith("/search") && (
              <Link to= {'/search'}>
                <button className="pt-2 mx-2">Browse</button>
                </Link>
            
            )}
        </div>
       
        </div>
        </form>
    )
}