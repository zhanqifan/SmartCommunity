const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FeedBack = new mongoose.Schema({
    // 用户名 关联userid 查找user表里的信息
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String
    },
    url: [String],  
    radio: {
        type: Number
    },
    comments: [{
        //关联userid 查找user表里的信息
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        textarea: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

let ComPlaintModel = mongoose.model("complaint", FeedBack);
module.exports = ComPlaintModel
