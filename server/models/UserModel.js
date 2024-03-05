const mongoose = require("mongoose")

// user模型==>users集合
const UserType = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    gender: String,//性别 0 1 2
    introduction: String,//简介
    avatar: String,
    role: Number,//管理员0 编辑1
    address: [Number],
})
//自动创建表名  
let UserModel = mongoose.model("user", UserType)

module.exports = UserModel