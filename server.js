require("dotenv").config()
const loginRoutes=require("./routes/Login")
const analystRoutes=require('./routes/analyst')
const adminRoutes=require('./routes/admin')
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
    origin:'http://localhost:3000', 
    optionsSuccessStatus:200
}))
//https://smart-attendance-fr.netlify.app/


//routes
app.use('/api/login',loginRoutes)
app.use('/api/analyst',analystRoutes)
app.use('/api/admin',adminRoutes)

//mongodb+srv://saiteja:test1234@cluster0.dlmwqza.mongodb.net/?retryWrites=true&w=majority
// mongoose.connect("mongodb://localhost:27017/SmartFace")
//     .then(()=>{
//         //listen
//         app.listen(4000,()=>{
//             console.log("connected to db \nlistening on port",4000)
//         })
//     })
//     .catch((error)=>{
//         console.log(error)
//     })

const dbUri = 'mongodb://127.0.0.1:27017/SmartFace';


mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        // Create and configure your Express app here (assuming 'app' is already defined)
        app.listen(4000, () => {
            console.log("Connected to database \nListening on port 4000");
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

