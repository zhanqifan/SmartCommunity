const NewsService = require("../../services/admin/NewsService")

const NewsController = {
    // 添加新闻
    add: async (req, res) => {
        console.log(req.body)
        const cover = req.file ? `http://127.0.0.1:3000/newsuploads/${req.file.filename}` : ""
        await NewsService.add({
            ...req.body,
            cover,
            createtime: new Date(),
            editTime: new Date()
        })
        res.send({
            msg: '添加成功'
        })
    },
    // 查询列表
    list: async (req, res) => {
        console.log(req.query)
        const { id, title, Size, Current,category } = req.query
        const { total, data } = await NewsService.find(id, title, Current, Size,category)
        res.send({
            code: '200',
            msg: '查询成功',
            data,
            total
        })
    },
    // 修改新闻
    publish: async (req, res) => {
        const cover = req.file ? `http://127.0.0.1:3000/newsuploads/${req.file.filename}` : req.body.cover
        await NewsService.publishNews({ ...req.body, cover })
        res.send({
            code: '200',
            msg: '修改成功'
        })
    },
    // 删除新闻
    delNews: async (req, res) => {
        const id = req.params.id
        await NewsService.delNews(id)
        res.send({
            code: '200',
            msg: '删除成功'
        })
    },
    // 热门阅读
    hotNews:async (req,res) =>{
     const data =  await NewsService.hotNews()
     res.send({
        code:'200',
        msg:'请求成功',
        data
     })

    }
}
module.exports = NewsController