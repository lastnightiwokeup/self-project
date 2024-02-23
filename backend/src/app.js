const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express(); 

const port = 8080;
app.use(cors());
app.use(express.json());
 
app.get('/', (req,res) => {
    res.send('Backend con NodeJS - Express + CRUD API REST + MySQL');
}); 
  
app.listen(port,()=>{
    console.log("Port ==> ", port);
});

