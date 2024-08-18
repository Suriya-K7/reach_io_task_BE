//router config

const userRouter = require("express").Router();

//getting user controllers

const {
  registerUser,
  confirmUser,
  loginUser,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

/*****************sign up new user*********************/

userRouter.post("/api/user/register", registerUser);

/*****************Confirm new user*********************/

userRouter.patch("/api/user/confirm/:id", confirmUser);

/****************** User Login ************************/

userRouter.post("/api/user/login", loginUser);

/****************Update user details*******************/

userRouter.patch("/api/user/updateuser", updateUser);

/****************Update user Password******************/

userRouter.patch("/api/user/changepassword", changePassword);

/*****************Forgot Password**********************/

userRouter.post("/api/user/forgotpassword", forgotPassword);

/*******************Reset Pasword**********************/

userRouter.patch("/api/user/resetpassword/:resetToken", resetPassword);

module.exports = userRouter;
