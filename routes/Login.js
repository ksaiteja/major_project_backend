const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/userModel')

router.post('/validate',async (req,res)=>{
    try{
        const {username,password}=req.body
        if(!username){
            return res.status(400).json({success:false,msg:"Username is required"})
        }
        if(!password){
            return res.status(400).json({success:false,msg:"Password is required"})
        }
        const user=await User.findOne({username})
        if(!user){
            return res.status(400).json({success:false,msg:"User not found"})
        }
        bcrypt.compare(password, user.password)
            .then((passwordMatch) => {
                if (!passwordMatch) {
                return res.status(400).json({ success: false, msg: "Username and Password do not match" });
                }
                
                return res.status(200).json({ success: true, role: user.role });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error.message });
            });
    }catch(error){
        return res.status(500).json({success:false,error:error.message})
    } 
})
router.post('/',async (req,res)=>{
    try{
        const {username,password,role}=req.body
        const hashedPassword=await bcrypt.hash(password, 10)
        const user = await User.create({ username,password:hashedPassword, role })
        return res.status(200).json(user)
    }catch(err){
        return res.status(400).json({error: err.message})
    }
})
router.patch('/',(req,res)=>{
    console.log(req)
    res.send("update the user info in the database")
})
router.delete('/',(req,res)=>{
    console.log(req)
    res.send("delete the user in the database")
})

module.exports=router

