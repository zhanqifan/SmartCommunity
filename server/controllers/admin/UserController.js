const UserService = require("../../services/admin/UserService")
const JWT = require('../../utils/JWT')

const UserController = {
    register:async(req,res)=>{
      const {username,password,address} = req.body
      await UserService.register({username,password,gender:'0',role:1,address})
      res.send({
        code:'200',
        msg:'注册成功'
      })
    },
    login: async (req, res) => {
        //   req.body处理参数拆解 交给service服务 处理查询
        // console.log(req.body)
        var result = await UserService.login(req.body)
        console.log(result,'111')
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "用户名和密码不匹配"
            })
        }
        else {
            // 生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username,
            }, "1d")
            // console.log(token)
            // 如果您的前端和后端运行在不同的域上，您可能遇到了跨域资源共享（CORS）的问题。在这种情况下，
            // 浏览器可能不会暴露所有的响应头给前端 JavaScript。为了解决这个问题，
            // 您需要在后端的响应中添加适当的 CORS 头，如 Access-Control-Expose-Headers，并包含 Authorization。
            res.header("Access-Control-Expose-Headers", "Authorization");
            res.header("Authorization", token)//让请求头携带token
            console.log(res.header)
            res.send({
                code: "200",
                data: {
                    _id:result[0]._id,
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction,//简介
                    avatar: result[0].avatar,
                    role: result[0].role,
                    address:result[0].address
                }
            })
        }
    },
    // pnpm install multer 处理大文件上传
    upload: async (req, res) => {
        console.log(req.file)
        const { username, introduction, gender,address } = req.body
        const token = req.headers["authorization"].split(" ")[1]
        const avatar = req.file ? `http://127.0.0.1:3000/avataruploads/${req.file.filename}` : ""
        var payload = JWT.verify(token)//验证并返回
        console.log(address)
        // 调用service模块更新 数据
       const dd=  await UserService.upload({
            _id: payload._id,
            username,
            introduction,
            gender,
            avatar,
            address:address.split(',').map(Number),
        })
        console.log(dd)
        if (avatar) {
            res.send({
                code: '200',
                msg: '上传成功',
                data: {
                    username, introduction, avatar, gender,address:address.split(',').map(Number)
                }
            })
        } else {
            res.send({
                code: '200',
                msg: '上传成功',
                data: {
                    username, introduction, gender,address:address.split(',').map(Number)
                }
            })
        }
    },
    // 添加用户接口
    add: async (req, res) => {
        const { username, password, role, introduction,address } = req.body
        const avatar = req.file ? `http://127.0.0.1:3000/avataruploads/${req.file.filename}` : "" 
        // 调用service模块更新 数据
        await UserService.add({
            username, password, role, introduction,
            gender: '0',
            avatar,
            address:address.split(',').map(Number)
        })
        res.send({
            code: '200',
            msg: '添加成功'
        })
    },
    // 查询用户列表
    list:async(req,res)=>{
        const {Size, Current} = req.query
       const {data,total} =  await UserService.find(req.query.username,Current,Size)
       res.send({
        code:'200',
        msg:'查询成功',
        data,
        total
      })
    },
    // 删除用户
    del:async(req,res)=>{
        const {_id} = req.body
        await UserService.del(_id)
        res.send({
            code:'200',
            msg:'删除成功'
        })

    },
    // 更新用户
    upUser:async(req,res)=>{
       
    await UserService.upUser(req.body)
     res.send({
            code:'200',
            msg:'更新成功',
            data:req.body
        })
    }
}
module.exports = UserController