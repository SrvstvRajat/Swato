const express=require('express')
const app=express();


// this is used for ...when data is set through post it send it to backend in json format 
app.use(express.json());

app.listen(3000);

let users={}

// for GET pages 
app.get('/users',(req,res)=>{
    res.send(users);
})


// for post 
app.post('/users',(req,res)=>{
    console.log(req.body);
    users=req.body
    res.send('Received Suceessfuly ')
})




// for patch

app.patch('/users',(req,res)=>{
    console.log(req.body);
    res.send('Patched Succesfully');
    for(key in req.body)
    {
        users[key]=req.body[key];
    } 
})



app.delete('/users',(req,res)=>{
    users={};
    res.send('Deleted Successfully')
})