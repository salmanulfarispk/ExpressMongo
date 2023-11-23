const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({

   name:"string",
   username:"string",
   email:"string",
   password:"string",
   photo:"string",

})
module.exports=mongoose.model("user",userSchema)