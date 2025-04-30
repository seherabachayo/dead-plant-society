import mongoose from 'mongoose';

//connecting database
export const connectDB = async () => {
    try {
        //using mongoose package to connect database from MONGO_URI string
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`) ;  
        
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1); //process code 1 means exit with failure and 0 mean success
    }
}