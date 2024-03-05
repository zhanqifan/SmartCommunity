const express =require('express')
const ComPlaintRouter = express.Router();
const ComPlaintControl = require("../../controllers/admin/ComPlaintControl")
const multer  = require('multer')
const upload = multer({ dest: 'public/complainuploads/' })//自动生成upload文件夹
ComPlaintRouter.post('/adminapi/complain/addplaint',upload.array('files'),ComPlaintControl.add)
ComPlaintRouter.get('/adminapi/complain/plaintlist',ComPlaintControl.list)
ComPlaintRouter.post('/adminapi/complain/postmsg',ComPlaintControl.postmsg)
ComPlaintRouter.delete('/adminapi/complain/delmsg/:_id',ComPlaintControl.del)
module.exports=ComPlaintRouter