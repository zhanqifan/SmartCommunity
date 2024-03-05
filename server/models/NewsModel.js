const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const NewsType = new mongoose.Schema({
    avatar: String,
    title: String,
    content: String,
    category: Number,//1最新动态 2典型案例 3通知公共
    cover: String,//图片
    isPublish: Number,//0未发布 1已发布‘
    createtime: Date,
    editTime: Date,
    username: String,
    views: { //浏览量
        default: 0,
        type: Number
    },
})
//自动创建表名  
let NewsModel = mongoose.model("news", NewsType)

module.exports = NewsModel