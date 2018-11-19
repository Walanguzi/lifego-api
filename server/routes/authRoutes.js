const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/authController');

const router = () => {
  userRouter.route('/register')
    .post(userController.register);

  userRouter.route('/login')
    .post(userController.login);

  userRouter.route('/change_password')
    .post(userController.changePassword);

  userRouter.route('/reset_password')
    .post(userController.resetPassword);

  userRouter.route('/change_email')
    .post(userController.changeEmail);

  userRouter.route('/delete_account')
    .post(userController.deleteAccount);

  return userRouter;
};

module.exports = router;
