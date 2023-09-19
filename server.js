require("dotenv").config()
const loginRoutes=require("./routes/Login")
const express=require("express")
const mongoose=require("mongoose")
const cors=require('cors')


const app=express()


//middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next()
})
app.use(cors({
    origin:'https://smart-attendance-fr.netlify.app/',
    optionsSuccessStatus:200
}))


//routes
app.use('/api/login',loginRoutes)



mongoose.connect("mongodb+srv://saiteja:test1234@cluster0.dlmwqza.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        //listen
        app.listen(4000,()=>{
            console.log("connected to db \nlistening on port",4000)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

