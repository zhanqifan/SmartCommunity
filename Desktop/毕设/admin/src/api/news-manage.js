import request from "../../utils/request";

// 添加新闻
export const addNews = (newsForm) =>{
    return request.post('/adminapi/news/add',newsForm,{
        // 这也是一个常见的 post 数据提交的方式，我们使用表单上传文件时，
        // 就要让 form 的 enctype 等于这个值，多用于文件上传。
        // 既可以上传文件等二进制数据，也可以上传表单键值对，只是最后会转化为一条信息
        headers:{
          "Content-Type":"multipart/form-data"  
        }
    })
}
// 查询公告列表和修改公告
export const getNewsList = (id) =>{
    return request.get('/adminapi/news/list',{
        params:{
            id
        }
    })
}
// 搜索查询
export const getSearchList = (title) =>{
    return request.get('/adminapi/news/list',{
        params:{
            title
        }
    })
}
// 分页查询
export const getPageInfo = (page) =>{
    return request.get('/adminapi/news/list',{
        params:page,
    })
}
// 修改新闻列表
export const controlPublish = (news) =>{
     return request.put('/adminapi/news/publish',news)
}
// 删除新闻
export const DeltetNews = (id) =>{
    return request.delete(`/adminapi/news/delNews/${id}`)
}