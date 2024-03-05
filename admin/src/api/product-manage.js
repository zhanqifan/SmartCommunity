import requst from '../../utils/request'

// 添加账单
export const addbill = (bill) =>{
    return requst.post('/adminapi/addbill',bill)
}
// 查询账单
export const findbill = (userInfo) =>{
    return requst.get('/adminapi/findbill',{
        params:userInfo
    })
}
// 筛选日期账单
export const filterbill = (data) =>{
    return requst.get('/adminapi/findbill',{
        params:data
        
    })
}
// 支付账单
export const paybill = ({_id,cost,name}) =>{
    return requst.post('/adminapi/paybill',{
        orderId:_id,
        cost:cost,
        name
    })
}
// 完成支付更新
export const resultbill = (data)=>{
    return requst.post('/adminapi/resultbill',data)
}

// 反馈添加
export const AddComplain = (data) =>{
    return requst.post('/adminapi/complain/addplaint',data,{
        headers:{
            "Content-Type":"multipart/form-data"  
          }
    })
}
// 反馈列表
export const ComplainList = (data) =>{
    return requst.get('/adminapi/complain/plaintlist',{
        params:
            data
    })
}
// 消息回复
export const PostMessage = (data) =>{
    return requst.post('/adminapi/complain/postmsg',data)
}
// 删除反馈
export const delMessage = (_id) =>{
    return requst.delete(`/adminapi/complain/delmsg/${_id}`)
}