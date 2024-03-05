const NewsModel = require("../../models/NewsModel")//导入数据库

const NewsService = {
    // 添加新闻
    add: async (data) => {
        return NewsModel.create(data)
    },
    find: async (id,title,pagenum,pagesize,category) => {
    
        const page = pagenum || 1; // 获取分页参数，默认为第一页
        const limit = pagesize || 10; // 获取每页数据量，默认为10条
        let query = {
          
        };
        // 构建查询条件
        if (title) {
            const regex = new RegExp(title, 'i'); // 'i' 表示不区分大小写
            query.title = regex;
        }
        if (category){
            query.category =  category
            
        }
        const total = await NewsModel.countDocuments(query)
        // 按照时间排序
        if(id){
         const data = await NewsModel.find({_id:id})
         await NewsModel.updateOne({_id:id},{$set:{views:data[0].views+1}})
         return {
            total,
            data 
         }
        }
        else{
            console.log(query)
          const data = await NewsModel.find(query).sort({editTime:-1}).skip((page - 1) * limit).limit(limit)
          return{
            data,total
          }
        }
            
    },
    // 新闻发布和修改
    publishNews: async ({editTime,_id,...body}) => {
        console.log(body)
        return NewsModel.updateOne({ _id:_id },{$set:{editTime:new Date(),...body}})
    },
    delNews:async (id)=>{
        return NewsModel.deleteOne({_id:id})
    },
    hotNews:async()=>{      //  按照浏览量降序  并且限制前10条
        return NewsModel.find().sort({views:-1}).limit(10)
    }
}
module.exports = NewsService