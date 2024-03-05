import request from '../../utils/request'

export const PublicAdd = (data)=>{
    return request.post('/adminapi/public/publicadd',data)
}

export const PublicList = (data) =>{
    return request.get('/adminapi/public/publiclist',{
        params:data
    })
}
export const PublicDel = (id) =>{
    return request.delete(`/adminapi/public/publicdel/${id}`)
}
export const PublicEdit = (data) =>{
    return request.put('/adminapi/public/publicedit',data,{
        headers:{
            "Content-Type":"multipart/form-data"  
          }
    })
}
// 用户列表
export const userlist = (data) =>{
    return request.get(`/adminapi/public/userlist`,{
        params:data
    })
}

