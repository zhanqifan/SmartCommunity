const ComPlaintModel = require('../../models/ComPlaintModel')
const ComPlaintService = {
  add: async (data) => {
    return ComPlaintModel.create(data)
  },
  list: async (params) => {
    const { Current = 1, Size = 10, } = params
    const page = Current  // 获取分页参数，默认为第一页
    const limit = Size // 获取每页数据量，默认为10条
    const query = params.userId?{userId:params.userId}:{}
    const total = await ComPlaintModel.countDocuments(query)
    const data= await ComPlaintModel.find(query).populate('userId').populate('comments.userId').skip((page - 1) * limit).limit(limit)
    return {
      total,
      data
    }
  },
  
  postmsg: async (body) => {
    const _id = body.userId;//帖子主id
    const newComment = {
      userId: body.commentId,//评论用户id
      textarea:body.textarea
    };
   await ComPlaintModel.findByIdAndUpdate(
      _id,
      {
        $push: { comments: newComment }
      },
      { new: true, useFindAndModify: false } // 返回更新后的文档，并使用新的findOneAndUpdate底层方法
    ) 
     return ComPlaintModel.find().populate('comments.userId').select('comments')
  },
  del:async(data)=>{
   return ComPlaintModel.deleteOne(data)
  }
}
module.exports = ComPlaintService