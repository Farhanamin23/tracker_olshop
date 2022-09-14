import  express  from "express";
const dbConnect = require('./dbConnect')
const transactionRoute = require('./route/transactionRoute')
const orderRoute = require('./route/orderRoute')
const app = express()
const userRoute= require('./route/userRoutes')

app.use(express.json())
app.use('/api/user/', userRoute) 
app.use('/api/transaction/', transactionRoute)
app.use('/api/order/', orderRoute)
const port=8000

app.listen(port, () => console.log(`server running on port ${port}`))
