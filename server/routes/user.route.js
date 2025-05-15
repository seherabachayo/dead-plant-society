import express from "express";
const router = express.Router();
import{ getUsers, createUser, updateUser, deleteUser} from "../controllers/user.controller.js"

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
export default router;
