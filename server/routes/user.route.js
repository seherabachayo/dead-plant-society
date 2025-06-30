import express from "express";
import{ login, getUsers, createUser, updateUser, deleteUser, googleLogin, searchUsers} from "../controllers/user.controller.js"


const router = express.Router();




router.post('/login', login);

//to handle login through google
router.post("/google-login", googleLogin); 


//get all users
// the / is prefixed by /api/users in user.route.js file
router.get("/", getUsers);//call get function in user.controller.js

 //server post adds user to db
 router.post("/", createUser);


//update user information
//use patch if updating some object info and put to update all of it
router.put("/:id", updateUser);

 //to delete users in database
 router.delete("/:id", deleteUser);

 //search for user, return user
router.get('/:id', searchUsers);







export default router;
