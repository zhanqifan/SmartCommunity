var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })//自动生成upload文件夹
var Newsrouter = express.Router();
const NewsController = require("../../controllers/admin/NewsController")

// 添加新闻
Newsrouter.post('/adminapi/news/add',upload.single('file'), NewsController.add);
// 获取新闻列表
Newsrouter.get('/adminapi/news/list',NewsController.list);
//新闻是否发布和修改
Newsrouter.put('/adminapi/news/publish',upload.single('file'),NewsController.publish);
//新闻删除
Newsrouter.delete('/adminapi/news/delNews/:id',NewsController.delNews);
// 热门阅读
Newsrouter.get('/adminapi/news/hotlist',NewsController.hotNews);


module.exports=Newsrouter