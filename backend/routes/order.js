const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAunthenticatedUser, authorizeRoles } = require('../middleware/authenticate');
const router = express.Router();


router.route('/order/new').post(isAunthenticatedUser,newOrder);
router.route('/order/:id').get(isAunthenticatedUser,getSingleOrder)
router.route('/myorders').get(isAunthenticatedUser,myOrders)

//admin routes
router.route('/admin/orders').get(isAunthenticatedUser,authorizeRoles('admin'),orders)
router.route('/admin/order/:id').put(isAunthenticatedUser,authorizeRoles('admin'),updateOrder)
router.route('/admin/order/:id').delete(isAunthenticatedUser,authorizeRoles('admin'),deleteOrder)


module.exports = router;