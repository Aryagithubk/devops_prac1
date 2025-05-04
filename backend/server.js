const express = require('express');
const app = express();

const PORT = 5002;

app.get('/',(req,res) =>{
    res.send('hello from backend api');
});

app.listen(PORT,()=>{
    console.log(`backend is running on port {PORT}`);
});