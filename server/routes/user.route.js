import express from "express";
import{ getUsers, createUser, updateUser, deleteUser, googleLogin} from "../controllers/user.controller.js"

const router = express.Router();

//get all users
// the / is prefixed by /api/users in user.route.js file
router.get("/", getUsers);//call get function in user.controller.js

 //server post adds user to db
 router.post("/", createUser);




 //to delete users in database
 router.delete("/:id", deleteUser);


//update user information
//use patch if updating some object info and put to update all of it
router.put("/:id", updateUser);


//to handle login through google
router.post("/google-login", googleLogin); 

export default router;
