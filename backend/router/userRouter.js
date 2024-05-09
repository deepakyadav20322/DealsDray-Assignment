const express = require('express');
const userRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const {userLogin,userRegister}  = require('../controler/userControler')



userRouter.route('/login').post(userLogin);
userRouter.route('/register').post(userRegister);

 module.exports = userRouter;

