import mongoose from "mongoose";


async function connectToDb() {

    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO_URI =", process.env.MONGO_URI);
    }catch(err){
        console.log(err.message);
    }
}

export default connectToDb;