import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    }
   

    //timestamps : true to keep track of when doc was created
});

const User = mongoose.model('User', userSchema); //create a collection called User using this schema
//note: mongooose will take User and make users collection
export default User;