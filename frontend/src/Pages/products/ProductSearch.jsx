import React,{Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../../components/product-section/Cracker.css'
import Footer from '../../components/footer/Footer'
import { getProducts } from '../../actions/productActions';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../../Pages/Home/MetaData';
import Pagination from 'react-js-pagination'
import Product from '../../Pages/products/Product';
import Loader from '../../components/Loader';
import Search from '../../components/search';
import './product.css'
import { Link, useLocation, useParams } from 'react-router-dom';
import { set } from 'mongoose';

const ProductSearch = () => {
  const location = useLocation();
 const dispatch = useDispatch();
const{products,loading,error,productsCount,resPerPage} =  useSelector((state)=>state.productsState)
const [currentPage,setCurrentPage]=useState(1);
const {keyword} = useParams();
const [category,setCategory] =useState()
const setCurrentPageNo = (pageNo)=>{
setCurrentPage(pageNo);
};
useEffect(()=>{
    if(error){
      return toast.error(error)
    } else{
       dispatch(getProducts(keyword,category,currentPage))
    }
},[error,dispatch,currentPage,keyword,category]);

const categories = [
  'Sound crackers',
'Twinkling star',
'Flower pot',
'Ground chakkara',
'Bijli crackers',
'Bomb',
'Rockets',
'Continue crackers',
'Special wala',
'Fancy show',
'Sky shot rider',
'Multi colour shot',
'Branded sky shot',
'Flying crackers',
'Standard fountain', 
'Mega fountain',
'Flash novalties',
'Varities',
'Colour matches',
'Gift box'
]
        
        
        
  return (
    <div>
   
        <MetaData title ={"Crackers"}/>
    <div className="cracker-display" id='cracker-diplay'>
            <h2>All Type Of Crackers</h2>
            {location.pathname.startsWith("/search/") && keyword && (
              <div className='d-flex justify-content-center align-items-center m-1'>
          <h6 className="text-center border p-1 border-success">Click browse to see all crackers</h6>
          {/* <Link to= {'/search'}>
            <button>Go Back</button>
            </Link> */}
            </div>
        )}
           <Search/>
           {/*Category filter*/}
          
          <Fragment>
                {loading ? <Loader/> : 
            <div className="cracker-display-list">
                <div className="run">
                 <h3>Browse Categories</h3>
                 <div className="category">
                  <ul>
                    {categories.map(category =>
<li key={category} onClick={()=>{setCategory(category)}}>{category}</li>)}
                  </ul>
                 </div>
                 </div>
                 <div className="ruin">
  <h3>Browse Categories</h3>
  <div className="category">
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="category-select"
    >
      <option value="" >Select a category</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
</div>

          <div className="cracker-view">
                {products && products.map(product => (
                    <Product key={product._id} product={product}/>
                ))}
                </div>
          
            </div>
}
<div className='d-flex justify-content-center align-items-center mt-5'>
<Link to= {'/products'}>
            <button>Go Back</button>
            </Link>
</div>
            </Fragment>
            {/* <div className="view-all">
        <button onClick={()=>navigate('/products')}>View All Crackers</button>
        </div> */}
{ productsCount > 0 && productsCount > resPerPage ?
<div className="d-flex justify-content-center mt-5">
    <Pagination
    activePage={currentPage}
    onChange={(pageNo) => {
        setCurrentPageNo(pageNo);  // Only set it once
      }}
    totalItemsCount={productsCount}
    itemsCountPerPage={resPerPage}
    nextPageText={"Next"}
    lastPageText={"Last"}
    firstPageText={"First"}
    itemClass={'page-item'}
    linkClass={'page-link'}
    />
</div> : null }

        </div>
        
        <Footer/>
        </div>
  )
}

export default ProductSearch