const express = require('express')//引入模块
const multer = require('multer')
const upload = multer({ dest: 'public/publicuploads/' })//自动生成upload文件夹
const PublicControl = require('../../controllers/admin/PublicControl')
const PublicRouter = express.Router()//注册路由

PublicRouter.post('/adminapi/public/publicadd',upload.array('files'),PublicControl.add)
PublicRouter.get('/adminapi/public/publiclist',PublicControl.list)
PublicRouter.delete('/adminapi/public/publicdel/:id',PublicControl.del)
PublicRouter.put('/adminapi/public/publicedit',upload.array('files'),PublicControl.edit)
PublicRouter.get('/adminapi/public/userlist',PublicControl.userlist)



module.exports=PublicRouter
