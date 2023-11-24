const express=require("express")
const router=express.Router()
const trycatch=require("../middelwares/TryCatchMiddle")
const controller=require("../controller/AdminController")
const verifyToken=require("../middelwares/AuthMiddleware")
const multer=require("multer")
const upload=multer({dest: ' uploads/' })


router.use(express.json())

router.post("/register",trycatch(controller.register))
router.use(verifyToken)
router.post("/login",trycatch(controller.login))
router.post("/user",upload.single('photo'),trycatch(controller.Createuser))
router.get("/user",trycatch(controller.getAllusers))
router.get("/user/:id",trycatch(controller.getUserByid))
router.put("/user/:id",trycatch(controller.updateUser))
router.delete("/user/:id",trycatch(controller.deleteByid))

module.exports=router
