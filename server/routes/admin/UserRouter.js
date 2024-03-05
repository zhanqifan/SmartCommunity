var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })//自动生成upload文件夹存放目标资源
var Userouter = express.Router();//路由名
const UserController = require("../../controllers/admin/UserController")

Userouter.post('/adminapi/user/register',UserController.register);//从controller里拿接口处理方法
Userouter.post('/adminapi/user/login',UserController.login);//从controller里拿接口处理方法
Userouter.post('/adminapi/user/upload',upload.single('file'), UserController.upload);//接受前端文件传参为file的参数

// upload.single('file') 是一个中间件，由 multer 库提供，用于处理单个文件上传。
// 这里的 'file' 是指定的文件字段的名称，它应该与前端表单中文件输入字段的 file 对象中name值相匹配。
Userouter.post('/adminapi/user/add',upload.single('file'), UserController.add);
Userouter.get('/adminapi/user/userlist',UserController.list)
Userouter.delete('/adminapi/user/deleteuser',UserController.del)
Userouter.put('/adminapi/user/deleteuser',UserController.upUser)
module.exports = Userouter;
