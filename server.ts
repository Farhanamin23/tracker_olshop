import  express  from "express";
require("dotenv").config();
require("./config/dbConnect").connect();
const transactionRoute = require('./route/transactionRoute')
const orderRoute = require('./route/orderRoute')
const app = express()
const userRoute= require('./route/userRoutes')

app.use(express.json())

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.use('/api/user/', userRoute) 
app.use('/api/transaction/', transactionRoute)
app.use('/api/order/', orderRoute)

app.listen(port, () => console.log(`server running on port ${port}`))
