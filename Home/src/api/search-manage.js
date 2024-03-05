import request from '@/utils/request'

export const PublicList = (data) =>{
    return request.get('/adminapi/public/publiclist',{
        params:data
    })
}
export const PublicDel = (id) =>{
    return request.delete(`/adminapi/public/publicdel/${id}`)
}

// 用户列表
export const userlist = (data) =>{
    return request.get(`/adminapi/public/userlist`,{
        params:data
    })
}