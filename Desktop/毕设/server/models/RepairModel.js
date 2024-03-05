const mongoose = require("mongoose")


const RepairType=new mongoose.Schema({
    usernameId:String,
    radio1: String,
    textarea: String,
    username:String,
    createtime:Date,
    godata: Date,
    updatetime:Date,
    mobile: Number,
    url:[String],
    address:[String],
    state:{
        type:Number,
        default:0
    }
})
                            //自动创建表名  
let RepairModel= mongoose.model("Repair",RepairType)

module.exports=RepairModel