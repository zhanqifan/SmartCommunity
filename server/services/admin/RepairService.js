const RepairModel = require('../../models/RepairModel')

const RepairServicer = {
    addRepair: async (form) => {
        form.address = form.address.split(',')
        return await RepairModel.create({ ...form })
    },
    // 报修列表
    Repairlist: async (query) => {
      
        const page =  query.Current || 1; // 获取分页参数，默认为第一页
        const limit = query.Size || 10; // 获取每页数据量，默认为10条
        const data = {}
        if (query.role !== '0'&&query.role) {
            data.usernameId = query._id
        }
        if(query.createtime){
          data.createtime={$gte:query.createtime[0],$lte:query.createtime[1]}
        }
        console.log(query)
        console.log(data)
        const total = await RepairModel.countDocuments(data)
        const datas= await RepairModel.find(data).sort({createtime:-1}).skip((page - 1) * limit).limit(limit)
        return{
           total,
           datas
        }
    },
    // 工单更新
    Repairup: async (_id, state) => {
              if(state===1){
                return RepairModel.updateOne({ _id }, { state,godata:new Date() })
              }
              else if(state===2){
                return RepairModel.updateOne({ _id }, { state,updatetime:new Date() })
              }
  
    }
}

module.exports = RepairServicer