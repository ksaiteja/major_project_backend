const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/userModel')

router.get('/',async (req,res)=>{
    try{
        const {username,password,role}=req.body
        const user=await User.findOne({username})
        if(!user){
            return res.status(400).json({msg:"user not found"})
        }
        const passwordMatch=bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(400).json({msg:"username and password does not match"})
        }
        if(user.role=="admin"){
            return res.status(200).json({msg:"return the admin page"})
        }
        else{
            return res.status(200).json({msg:"return the student page"})
        }
    }catch(error){
        return res.status(500).json({error:error.message})
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

