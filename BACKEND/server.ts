import  express  from "express";
import transactionRoute from './route/transactionRoute'
import orderRoute from './route/orderRoute'
import resselerRoute from './route/resselerRoute'
import userRoute from './route/userRoutes'
require("dotenv").config();
require("./config/dbConnect").connect();

const app = express()

app.use(express.json())

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.use('/api/user/', userRoute) 
app.use('/api/transaction/', transactionRoute)
app.use('/api/order/', orderRoute)
app.use('/api/resseler/' ,resselerRoute)

app.listen(port, () => console.log(`server running on port ${port}`))
