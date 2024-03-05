const UserModel = require("../../models/UserModel")

// 在这里查找数据库内容
const UserService = {
    register:async(form)=>{
        console.log(form)
     return UserModel.create(form)
    },
    login: async ({ username, password }) => {
        console.log(username, password)
        // 导入数据库模型 并查找
        return UserModel.find({ username, password })
    },
    // 更新用户信息
    upload: async ({ _id, username, introduction, gender, avatar, address }) => {
        console.log(address)
        if (avatar) {
            return UserModel.updateOne({
                _id
            }, {
                username, introduction, gender, avatar, address,_id
            })
        }
        else {
            return UserModel.updateOne({
                _id
            }, {
                username, introduction, gender, address,_id
            })
        }
    },
    // 添加用户
    add: async ({ username, password, role, introduction, gender, avatar, address }) => {
        return UserModel.create({
            username, password, role, introduction, gender, avatar, address
        })
    },
    //  查询用户类别
    find: async (username,pagenum, pagesize) => {
        const page = pagenum || 1; // 获取分页参数，默认为第一页
        const limit = pagesize || 10; // 获取每页数据量，默认为10条
        let query = {};
        // 构建查询条件
        if (username) {
            const regex = new RegExp(username, 'i'); // 'i' 表示不区分大小写
            query.username = regex;
        }
        const total = await UserModel.countDocuments(query)
        const data = await UserModel.find(query).skip((page - 1) * limit).limit(limit)
        return { total, data }
    },
    // 删除用户
    del: async (id) => {
        return UserModel.deleteOne({ id })
    },
    // 更新用户
    upUser: async (body) => {
        return UserModel.updateOne({ _id: body._id }, body)
    }
}
module.exports = UserService