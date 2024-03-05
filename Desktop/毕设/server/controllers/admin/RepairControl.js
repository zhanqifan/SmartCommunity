const RepairService = require('../../services/admin/RepairService')
const RepairControl = {
    // 添加报修
    addRepair: async (req, res) => {
        const url = req.files.map(item => {
            return item.url = `http://127.0.0.1:3000/repairuploads/${item.filename}`
        })
        await RepairService.addRepair({ ...req.body, url })
        res.send({
            code: '200',
            msg: '添加成功'
        })
    },
    //    报修列表
    Repairlist: async (req, res) => {
      console.log(req.query)
      const {total,datas}= await RepairService.Repairlist(req.query)    
      res.send({
        code:'200',
        msg:'查询成功',
        datas,
        total
      })
    },
    Repairup:async(req,res)=>{
     const {id,state}= req.body
     await RepairService.Repairup(id,state)
     res.send({
      code:'200',
      msg:'更新成功',
     })
    }
}
module.exports = RepairControl