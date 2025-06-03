import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:
    {
        type: String,
        //change so password is only required for local users 
        required: function() {
            return this.provider == 'local';
        }
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    provider: {
        type: String, 
        enum: ['local', 'google'], 
        default:'local'
    }, 
    avatar: {
     type: String
    },
   

    //timestamps : true to keep track of when doc was created
});

const User = mongoose.model('User', userSchema); //create a collection called User using this schema
//note: mongooose will take User and make users collection
export default User;