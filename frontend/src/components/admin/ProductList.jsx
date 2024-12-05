import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearError } from "../../slices/authslice"
import Loader from "../Loader"
import { deleteProduct, getAdminProducts } from "../../actions/productActions"
import {MDBDataTable} from 'mdbreact'
import { Link } from "react-router-dom"
import { Button, NavDropdown } from "react-bootstrap"
import Sidebar from "./Sidebar"
import { clearProductDeleted } from "../../slices/productSlice"

export default function ProductList(){
    const {products = [],loading = true ,error} = useSelector(state=>state.productsState)
    const {isProductDeleted,error:productError} = useSelector(state=>state.productState)
    const dispatch = useDispatch();
    // const deleteHandler = (e, id) => {
    //     e.target.disabled = true;
    //     dispatch(deletePr(id))
    // }
    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }
    const setProducts = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        products.forEach( product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price : `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                       
                        <Button onClick={e => deleteHandler(e, product._id)}  className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    useEffect(() => {
        if(error || productError) {
            toast(error || productError, {
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isProductDeleted) {
            toast('Product Deleted Succesfully!',{
                type: 'success',
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts)
    },[dispatch, error, isProductDeleted])
    return(
        <div className="row">
        <div className="col-12 col-md-2">
        <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Product List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setProducts()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}