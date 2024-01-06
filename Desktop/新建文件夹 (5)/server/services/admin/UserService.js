const UserModel = require("../../models/UserModel")

// 在这里查找数据库内容
const UserService = {
    login: async ({username, password} ) => {
        console.log(username,password)
        // 导入数据库模型 并查找
        return UserModel.find({username,password})
    },
    // 更新用户信息
    upload:async({_id,username,introduction,gender,avatar})=>{
      if(avatar){
        return UserModel.updateOne({
            _id
        },{
            username,introduction,gender,avatar
        })}
        else{
            return UserModel.updateOne({
                _id
            },{
                username,introduction,gender
            })  
        }
    } ,
    // 添加用户
    add:async({username,password,role,introduction,gender,avatar})=>{
          return UserModel.create({
            username,password,role,introduction,gender,avatar
          })
           
      },
    //  查询用户类别
    find:async()=>{
        return UserModel.find()
    }, 
    // 删除用户
    del:async(id)=>{
       return UserModel.deleteOne({id})
    },
    // 更新用户
    upUser:async(body)=>{
        return UserModel.updateOne({_id:body._id},body)
    }
}
module.exports = UserService