const PublicService = require('../../services/admin/PublicService')
const PublicControl = {
    add:async (req,res) => {
        console.log(req.files)
        const srcList = req.files.map(item => {
            return item.url = `http://127.0.0.1:3000/publicuploads/${item.filename}`
        })
         await PublicService.add({...req.body,srcList})
        res.send({
            msg: '操作成功'
        })
    },
    list:async(req,res)=>{
      console.log(req.query)
      const {total,arr:data} = await PublicService.list(req.query)
      res.send({
        msg:'查询成功',
        data,
        total
      }) 
    },
    del:async(req,res)=>{ 
        const data = await PublicService.del(req.params.id)
        console.log(data)
        res.send({
        msg:'删除成功'
     })
    },
    edit:async(req,res)=>{
        const url = req.files.map(item => {
            return item.url = `http://127.0.0.1:3000/publicuploads/${item.filename}`
        })
        const arr= req.body.srcList.split(',')
        req.body.srcList=[...arr,...url]
        req.body.OpenDate=req.body.OpenDate.split(',')
        await PublicService.edit(req.body)
        res.send({
        msg:'更新成功',
        code:'200'
     })
    },
    userlist:async(req,res)=>{
      console.log(req.query)
      const {total,arr:data} = await PublicService.userlist(req.query)
      res.send({
        msg:'查询成功',
        code:'200',
        data,
        total
      })
    },

}
module.exports = PublicControl