const express=require('express');
const bookingRouter=express.Router();
const {protectroute}=require('../controller/authController')
const {createSession}=require('../controller/bookingController')

bookingRouter.post('/createSession',protectroute,createSession);
bookingRouter.get('/createSession',function(req,res){
    res.sendFile('/views/booking.html',{root:__dirname})
})

module.exports=bookingRouter;
