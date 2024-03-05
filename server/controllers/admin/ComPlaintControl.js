const ComPlaintService = require('../../services/admin/ComplaintService')
const ComPlaintControl = {
  add:async(req,res) =>{
    console.log(req.body)
    const url = req.files.map(item => {
        return item.url = `http://127.0.0.1:3000/complainuploads/${item.filename}`
    })
   await ComPlaintService.add({url,...req.body})
    res.send({
        code:'200',
        msg:'添加成功'
    })
  },
  list:async(req,res) =>{
   const {total,data} = await ComPlaintService.list(req.query)
   res.send({
    code:'200',
    data,
    total
   })
  },
  postmsg:async(req,res)=>{
    console.log(req.body)
    const data= await ComPlaintService.postmsg(req.body)
    res.send({
      code:'200',
      msg:'留言成功',
      data
    })
 },
 del:async(req,res)=>{
   await ComPlaintService.del(req.params) 
  res.send({
    code:'200',
    msg:'删除成功'
  })
 }
}
module.exports = ComPlaintControl