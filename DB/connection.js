const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/UsersData", {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true}
).then(()=>{
    console.log(`connection established successfully`);
}).catch((e)=>{
    console.log(e);
})