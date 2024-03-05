const express = require('express')
var Repairouter = express.Router();//路由名
const multer = require('multer')
const upload = multer({ dest: 'public/repairuploads/' })//自动生成upload文件夹
const RepairControl = require("../../controllers/admin/RepairControl")

Repairouter.post('/adminapi/repair/add',upload.array('files'),RepairControl.addRepair)
Repairouter.get('/adminapi/repair/list',RepairControl.Repairlist)
Repairouter.put('/adminapi/repair/upstep',RepairControl.Repairup)
module.exports =Repairouter