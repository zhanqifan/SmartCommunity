import request from "@/utils/request";

// 更新个人中心
export const postUserForm = (UserForm) => {
  return   request.post('/adminapi/user/upload',UserForm,{
        // 这也是一个常见的 post 数据提交的方式，我们使用表单上传文件时，
        // 就要让 form 的 enctype 等于这个值，多用于文件上传。
        // 既可以上传文件等二进制数据，也可以上传表单键值对，只是最后会转化为一条信息
        headers:{
          "Content-Type":"multipart/form-data"  
        }
    })
}