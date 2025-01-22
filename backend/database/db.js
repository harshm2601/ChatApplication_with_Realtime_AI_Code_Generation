import mongoose from "mongoose";

console.log();

function connect(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log(err);
    })
}

export default connect;