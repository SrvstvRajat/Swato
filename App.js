const express=require('express')
const app=express();
const cors=require("cors")
require('./models/usermodel')
require('./models/planModel')
app.use(express.static('public/build'));

const cookieParser=require('cookie-parser');

app.use(express.json());
const port=process.env.PORT || 5000;
app.use(cookieParser());
app.listen(port,function(){
    console.log(`Server listening on port ${port}`);
});


const userRouter=require('./Routers/userrouter');
// const authRouter=require('./Routers/authrouter');
const planRouter=require('./Routers/planRouter');
const reviewRouter=require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRoute');
// app.use('/auth',authRouter)
// app.use('/',(req,res)=>{
//     res.send("Hello");
// })
// app.use('/',(req,res)=>{
//     res.sendFile('..\foodApp_frontend\src\Components\Home Page\Home.js',{root:__dirname});
// })
// app.use(cors)
// app.use('/',(req,res)=>{
//     res.send("Hello");
// })
app.use('/user',userRouter)
app.use('/plans',planRouter)
app.use('/review',reviewRouter)
app.use('/booking',bookingRouter);






