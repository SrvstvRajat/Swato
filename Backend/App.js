const express=require('express')
const app=express();
require('./models/usermodel')
require('./models/planModel')
const cookieParser=require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.listen(3000);


const userRouter=require('./Routers/userrouter');
// const authRouter=require('./Routers/authrouter');
const planRouter=require('./Routers/planRouter');
const reviewRouter=require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRoute');
// app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/plans',planRouter)
app.use('/reviews',reviewRouter)
app.use('/booking',bookingRouter);






