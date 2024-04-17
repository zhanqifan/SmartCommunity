var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');//自己的接口
const Newsrouter = require('./routes/admin/NewsRouter');//新闻
const Billsrouter = require('./routes/admin/BillsRouter')//缴费
const Repairouter = require('./routes/admin/RepairRouter')//报修
const ComPlainnRouter = require('./routes/admin/ComPlaintRouter')//反馈
const PublicRouter = require('./routes/admin/PublicRouter')//信息查询
const JWT = require('./utils/JWT');
var cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);//模版
app.use('/users', usersRouter);//模版

app.use((req, res, next) => {
  //  如果token有效next()
  // 如果过期了 返回401错误
  if (req.url === "/adminapi/user/login"||req.url ==='/adminapi/user/register'||req.url==='/adminapi/news/list') {
    next()
    return
  }
  // 进入页面找token 不停刷新续token 确保 用户在操作
  let token = req.headers["authorization"].split(" ")[1]
  if (token) {
    var payload = JWT.verify(token)//验证并返回
    // console.log(payload)
    if (payload) {
      // 生成新的token
      let newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, "1d")
      // console.log(newToken)
      // 给header续上
      res.header("Access-Control-Expose-Headers", "Authorization");
      res.header("Authorization", newToken)
      next()
    }
    else {
      res.status(401).send({ errorCode: "-1", merrorInfo: "token过期请重新登录" })
    }
  }
})
app.use(UserRouter)//这里中间件记得引用 不然请求过不去
app.use(Newsrouter)
app.use(Billsrouter)
app.use(Repairouter)
app.use(PublicRouter)
app.use(ComPlainnRouter)
// adminapi 后台系统用
// webapi 企业官网用

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
