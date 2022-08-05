const express=require('express');
const app=express();

app.listen(3000);

app.get('/',(req,res)=>{
    res.send('Hello');
})

app.get('/about',(req,res)=>{
    res.sendFile('/views/index.html',{root:__dirname});
})

app.get('/about-me',(req,res)=>{
    res.redirect('/about')
})
app.use((req,res)=>{
    res.status(404).sendFile('/views/error.html',{root:__dirname})
})