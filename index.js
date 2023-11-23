require("dotenv").config()
const express=require("express")
const app=express()
const port=5000
const adminroute=require("./routes/AdminRouter")




app.use(express.json())
app.use("/",adminroute)

app.listen(port,()=>{
    console.log("Running",port)
})