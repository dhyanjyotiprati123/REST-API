require('dotenv').config();
const express= require("express");
require("./DB/connection");
const Routes=require("./Routes/router");
const cookieParser=require("cookie-parser");
const cors=require("cors");


const app=express();
const port=process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(Routes);

app.listen(port,()=>{
    console.log(`server started at ${port} no of port`);
})
