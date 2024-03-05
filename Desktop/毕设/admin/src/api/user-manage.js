import request from "../../utils/request";

// 添加用户
export const addUser = (UserForm) =>{
    return request.post('/adminapi/user/add',UserForm,{
        // 这也是一个常见的 post 数据提交的方式，我们使用表单上传文件时，
        // 就要让 form 的 enctype 等于这个值，多用于文件上传。
        // 既可以上传文件等二进制数据，也可以上传表单键值对，只是最后会转化为一条信息
        headers:{
          "Content-Type":"multipart/form-data"  
        }
    })
}
// 用户列表
export const getUser = (username) =>{
   return request.get('/adminapi/user/userlist',{
     params:{
      username    
    }
   })
}
// 处理分页
export const getPageInfo = (page) =>{
  return request.get('/adminapi/user/userlist',{
   params:page
  })
}

// 用户删除
export const delUser = (id) =>{
  return request.delete('/adminapi/user/deleteuser',{
    data:{
        id
    }
  })
}
// 用户更新
export const upUser = (data) =>{
  return request.put('/adminapi/user/deleteuser',data)
}