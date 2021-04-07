const User= require("../DB/model");
const Bcrypt=require("bcryptjs");

const GetUser=async(req,res)=>{
    try {
        const findUser=await User.find();
        res.status(200).send(findUser)
        
    } catch (error) {
        res.sattus(400).send(error)
    }
}

const CreateUser= async(req,res)=>{
    const {name, phone, email, password, cpassword}=req.body;

    try{
        
    if(password === cpassword){
        
    const newUser=new User({
        name,
        phone,
        email,
        password,
        cpassword
    })

    const token=await newUser.generateJwtToken();

    res.cookie("jwt", token ,{
        expires: new Date(Date.now + 100000),
        httpOnly: true
    })
    
    await newUser.save();
    res.send("registered successfully")

    }else{
        res.send("password not matching")
    }
  
    }catch(err){
        res.status.send(err);
    }

}

const DeleteUser= async(req,res)=>{
    try {
        const findUser= await User.findOne({email});

         await findUser.remove()
        
    } catch (error) {
        res.status(400).send(error)
    }
}

const LoginUser=async(req,res)=>{

    const {email, password}=req.body;
    try{
        const findUser= await User.findOne({email});
        const isMatch=await Bcrypt.compare(password, findUser.password)
        const token = await findUser.generateJwtToken();

        res.cookie("jwt", token ,{
        expires: new Date(Date.now + 100000),
        httpOnly: true
         })

        if(isMatch){
            res.status(200).send(findUser)
        }else{
            res.send("something went wrong")
        }

    }catch(err){
        res.status(400).send(`invalid email ${err}`)
    }

}

module.exports={
    GetUser,
    CreateUser,
    LoginUser,
    DeleteUser
}