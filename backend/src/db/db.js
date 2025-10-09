const mongoose = require('mongoose');

const connectDB = (()=>{
    mongoose.connect("mongodb://localhost:27017/food-view")
    //process.env.MONGODB_URL
    .then(()=>{
        console.log("MangoDB connected");
    })
    .catch((err)=>{
        console.log("MongoDB connection error", err);
        
    })
})

module.exports = connectDB;