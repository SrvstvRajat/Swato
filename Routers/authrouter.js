const express=require('express');
const usermodel = require('../models/usermodel');
const authRouter=express.Router();
// const protectroute=require('../Routers/authhelper')
const jwt=require('jsonwebtoken');
const JWT_KEY='rchtfgyjhuji3o2e381'

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp)

authRouter
.route('/login')
.post(loginuser)

function getSignUp(req,res)
{
    res.sendFile('views/index.html',{root:__dirname})
}

async function postSignUp(req,res)
{
    let data=req.body;
    let user=await usermodel.create(data);
    res.send(user);
}


async function loginuser(req,res)
{
    try{
    let data=req.body;
    let user=await usermodel.findOne({name:data.name})
    if(user)
    {
        if(user.password===data.password)
        {
            let uid=user['_id'];
            let token=jwt.sign({payload:uid},JWT_KEY);
            res.cookie('login',token,{httpOnly:true});
            return res.json({
                message:'user has logged in',
                userDetails:data,
            })
        }
        else{
            return res.json({
                message:'wrong credentials',
            })
        }   
    }
    else{
        return res.json({
            message:'user does not exist',
        })
    }
    }
    catch(err){
        return res.json({  
            message:err.message,
            detail:'ns0s'
        })
    }

}


module.exports=authRouter;