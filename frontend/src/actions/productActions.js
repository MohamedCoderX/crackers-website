import axios from 'axios'
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSucess } from '../slices/productsSlice';
import { deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess } from '../slices/productSlice';



export const getProducts = (keyword,category,currentPage,id,name,description,image) => async (dispatch) => {
    try{
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`;
        if(keyword){
            link += `&keyword=${keyword}`
        }
        if(category){
            link += `&category=${category}`
        }
        const {data} = await axios.get(link);
        dispatch(productsSucess(data))
    }catch(error){
//handle error
dispatch(productsFail(error.response.data.message))
    }
}

// export const getProduct = id => async(dispatch)=>{
//     try{
//         dispatch(productsRequest())
//         const{data} = await axios.get(`/api/v1/product/${id}`);
//         dispatch(productsSucess(data))
//     }catch(error){

//     }
// }

export const getAdminProducts =  async (dispatch) => {
    try{
        dispatch(adminProductsRequest())
        
        const {data} = await axios.get(`/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data))
    }catch(error){
//handle error
dispatch(adminProductsFail(error.response.data.message))
    }
}

export const createNewProduct = productData => async (dispatch) => {
    try{
        dispatch(newProductRequest())
        
        const {data} = await axios.post(`/api/v1/admin/product/new`,productData);
        dispatch(newProductSuccess(data))
    }catch(error){
//handle error
dispatch(newProductFail(error.response.data.message))
    }
}
export const deleteProduct  =  id => async (dispatch) => {

    try {  
        dispatch(deleteProductRequest()) 
        await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}