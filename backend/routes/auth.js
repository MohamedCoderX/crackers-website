const express = require("express");


const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword, 
    getUserProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
 } = require("../controllers/authController");
const { isAunthenticatedUser, authorizeRoles } = require("../middleware/authenticate");
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/myprofile').get(isAunthenticatedUser,getUserProfile)


//Admin Routes
router.route('/admin/users').get(isAunthenticatedUser,authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAunthenticatedUser,authorizeRoles('admin'), getUser);
router.route('/admin/user/:id').put(isAunthenticatedUser,authorizeRoles('admin'), updateUser);
router.route('/admin/user/:id').delete(isAunthenticatedUser,authorizeRoles('admin'), deleteUser);

module.exports = router;