const express=require('express')
const userRouter=express.Router();
const {updateProfileImage,getUser,getAllUser,updateUser,deleteUser}=require('../controller/usercontroller');
const {signup,login,isAuthorised,protectroute,forgetPassword,resetPassword,logout}=require('../controller/authController');
const multer = require('multer');
// const { filter } = require('lodash');



// userRouter
// .route('/')
// .get(protectroute,getUser)
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser);

//options for user
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser);



//login signup
userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)


//multer

const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        // console.log("kuch to hua");
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});
const filter=function(req,file,cb){
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
    else
    {
        cb(new Error("Not An Image! Please upload an Image"),false)
    }
}


const upload=multer({
    storage: multerStorage,
    fileFilter:filter
})

userRouter.post('/ProfileImage',upload.single('photo'),updateProfileImage);
userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile('C://Users/Rajat/Desktop/Temp Bacend/views/multer.html')
})


//get profile page for user
userRouter.use(protectroute);
userRouter
.route('/userProfile')
.get(getUser)



//forget password
userRouter
.route('/forgetPassword')
.post(forgetPassword)

//reset password
userRouter
.route('/resetPassword/:token')
.post(resetPassword)


userRouter
.route('/logout')
.get(logout) 


//admin specific function
// userRouter.use(protectroute);
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)

module.exports=userRouter;