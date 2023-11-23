const mongoose=require("mongoose")
const adminSchema=new mongoose.Schema({

    name:"string",
    email:"string",
    username:"string",
    password:"string",
})

module.exports=mongoose.model("admin",adminSchema)