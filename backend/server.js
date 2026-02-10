import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import dns from "node:dns/promises";
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// Set DNS servers before creating MongoClient
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//app config
const app = express()
const port = process.env.PORT || 8000

//db connection
connectDB();

//cloudinary connection
connectCloudinary();

//middleware
app.use(cors())
app.use(express.json())

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)



app.get('/', (req, res) => {
    res.status(200).send('API WORKING')

})

app.listen(port, () => {
    console.log("Listening to requests on", port)
});

