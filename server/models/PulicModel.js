const mongoose = require('mongoose')

const PublicType =new mongoose.Schema({
  Public:String,
  OpenDate:[String],
  Address:String,
  srcList:[String]
})

let PublicModel = mongoose.model('Public',PublicType)

module.exports=PublicModel