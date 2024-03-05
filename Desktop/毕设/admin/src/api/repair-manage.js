import requst from '../../utils/request'
// 工单添加
export const RepairAdd = (ruleForm) =>{
     return requst.post('/adminapi/repair/add',ruleForm,{
          headers:{
               "Content-Type":"multipart/form-data"  
             }
     })
}
// 工单列表
export const RepaitList = (data) =>{
     return requst.get('/adminapi/repair/list',{
          params:data
     })
}
// 提交工单
export const upstep = (data) =>{
     return requst.put('/adminapi/repair/upstep',data)
}
// 获取分页或者搜索
export const getPageInfo = (page) =>{
     return requst.get('/adminapi/repair/list',{
          params:page
     })
}

