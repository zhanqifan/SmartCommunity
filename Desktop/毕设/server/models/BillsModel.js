const mongoose = require('mongoose')


const BillType = new mongoose.Schema({
    address: [Number],//住宅号
    publiclift: Number, //电费 公共电梯费
    publicwater: Number, //水费 公共水费
    publicelectric:Number,//公共电费
    propertyfees: Number, //物业费
    radio: Number, //类型
    billdata: Date, //生成日期
    state:{       
        type:String,
        default:'0'//默认未缴纳
    }
})
let BillModel = mongoose.model('Bills',BillType)
module.exports=BillModel
