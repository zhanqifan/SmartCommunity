const PublicModel = require('../../models/PulicModel')
const UserModel = require('../../models/UserModel')
const PublicService = {
    add: async (body) => {
        body.OpenDate = body.OpenDate.split(',')
        return PublicModel.create(body)
    },
    list: async (params) => {
        const { Public, Current = 1, Size = 10,} = params
        const page = Current  // 获取分页参数，默认为第一页
        const limit = Size // 获取每页数据量，默认为10条
        const data={}
        if (Public) {
            data.Public = new RegExp(Public, 'i');
        }
        const total= await PublicModel.countDocuments(data)
         const arr = await PublicModel.find(data).skip((page-1)*limit).limit(limit)
         return{
            total,
            arr
         }
    },
    del: async (_id) => {
        return PublicModel.deleteOne({ _id })
    },
    edit: async (body) => {
        const { _id } = body
        return PublicModel.updateOne({ _id }, body)
    },
    userlist: async (params) => {
        const {  address, Current = 1, Size = 10, username } = params
        const page = Current  // 获取分页参数，默认为第一页
        const limit = Size // 获取每页数据量，默认为10条
        const data={}
        if (username) {
            data.username = new RegExp(username, 'i');
        }
        // 如果提供了 address，添加到查询对象
        if (address) {
            data.address = address;
        }
        const total = await UserModel.countDocuments(data)
        const arr = await UserModel.find(data).skip((page - 1) * limit).limit(limit)
        console.log(total)
        return {
            total, arr
        }
    },
 
}

module.exports = PublicService