import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
import Loader from "../Loader"
import {  getAdminProducts } from "../../actions/productActions"
import {MDBDataTable} from 'mdbreact'
import { Link } from "react-router-dom"
import { Button} from "react-bootstrap"
import Sidebar from "./Sidebar"
import { clearProductDeleted } from "../../slices/productSlice"
import { adminOrders as adminAction, deleteOrder,adminOrders } from "../../actions/orderActions"
import { validateShipping } from "../cart/Shipping"

export default function OrderList(){
    const {adminOrders,products = [],loading = true ,error,isOrderDeleted} = useSelector(state=>state.orderState)
    const {user} = useSelector(state=>state.authState)
    const {shippingInfo} = useSelector(state=>state.cartState)
    const dispatch = useDispatch();
    // const deleteHandler = (e, id) => {
    //     e.target.disabled = true;
    //     dispatch(deletePr(id))
    // }
    const deleteHandler = (e,id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }
  
    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'Name Of the Customer',
                    field: 'username',
                    sort: 'asc'
                },
                {
                    label:'Address',
                    field:'address',
                    sort:'asc',
                    attributes: {
                        style: { width: '300px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
                      },

                },
                {
                    label:'Phone Number',
                    field:'Phoneno',
                    sort:'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noofItems',
                    sort: 'asc'
                },

                {
                    label: 'Amouunt',
                    field: 'Amount',
                    sort: 'asc'
                },
{
    label:"Ordered Items",
    field:"orderitmes",
    sort:'asc'
},
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }
        
      
        const addresss = (shippingInfo) => { 
            return (
              <p>
                {shippingInfo?.address || "Address Not Provided"}, 
                {shippingInfo?.city || "City Not Provided"}, 
                {shippingInfo?.postalCode || "Postal Code Not Provided"}, 
                {shippingInfo?.state || "State Not Provided"}, 
            
              </p>
            );
          };
          
adminOrders.forEach( order => {
    const shippingInfos = order?.shippingInfo || {}

  const orderItemsDetails = order?.orderItems.map((item, index) => {
      // The index will now automatically increase for each item in orderItems
      return `${[index + 1]}.${item.name} (Qty: ${item.quantity}, Price: ₹${item.price})`;
  })
  .join(', ') || 'No items';
  console.log(orderItemsDetails)
            data.rows.push({
                username: shippingInfos?.name || "not found",
                address: (<Fragment>{addresss(shippingInfos)}</Fragment>)|| "Address Not Provided",
                noofItems: order?.orderItems?.length || 0,
                Phoneno: order?.shippingInfo?.phoneNo || "Phone Not Provided",
                Amount: `₹${order?.totalPrice?.toFixed(2) || "0.00"}`,
                orderitmes:orderItemsDetails,
                actions: (
                    <Fragment>

                        <Button onClick={e => deleteHandler(e,order._id)}  className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }
  
    useEffect(() => {
        if(error) {
            toast(error, {
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isOrderDeleted) {
            toast('order Deleted Succesfully!',{
                type: 'success',
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;

        }

        dispatch(adminAction)
       
    },[dispatch, error, isOrderDeleted,shippingInfo])
    return(
        <div className="row">
        <div className="col-12 col-md-2">
        <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Order List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setOrders()}
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