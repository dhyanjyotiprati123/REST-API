const mongoose= require("mongoose");
const Bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

const UserSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.generateJwtToken= async function(req,res){
    try {
        const token= jwt.sign({_id: this._id.toString()}, process.env.KEY);
        this.tokens=this.tokens.concat({token})
        await this.save();
        return token;
    } catch (error) {
        res.send(error)
    }
}

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
      this.password=await Bcrypt.hash(this.password, 10)
      this.cpassword=await Bcrypt.hash(this.cpassword, 10)
    }
    next();
})

const User=new mongoose.model("User", UserSchema);

module.exports=User;