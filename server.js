require("dotenv").config()
const loginRoutes=require("./routes/Login")
const express=require("express")
const mongoose=require("mongoose")

const app=express()


//middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next()
})


//routes
app.use('/api/login',loginRoutes)



mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen
        app.listen(process.env.PORT,()=>{
            console.log("connected to db \nlistening on port",process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

