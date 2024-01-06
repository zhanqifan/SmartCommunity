var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  //  如果token有效next()
  // 如果过期了 返回404错误
  if (req.url === "/adminapi/user/login") {
    next()
    return
  }
  // 进入页面找token 不停刷新续token
  const token = req.headers["authorization"].split(" ")[1]
  if (token) {
    var payload = JWT.verify(token)//验证并返回
    // console.log(payload)
    if (payload) {
      // 生成新的token
      const newToken = JWT.generate({
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
      res.status(401).send({ errorCode: "-1", merrorInfo: "token过期" })
    }
  }
})
app.use(UserRouter)

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
