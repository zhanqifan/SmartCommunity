const BillsModel = require('../../models/BillsModel')

const BillsService = {
  addBill: async (body) => {
    return BillsModel.create(body)
  },
  findBill: async (billdata, address, role, Size, Current, radio) => {
    const PageSize = Size || 10
    const PageNum = Current || 1
    // 判断身份是否为住户 是住户传住户号 物业则返回所有住户 优雅写法
    const baseQuery = role === '1' ? { address } : {};
    // 构建日期筛选条件
    const dateFilter = {};
    if (billdata) {
      // 假设你的账单数据有名为date的日期属性
      const startDate = new Date(billdata[0]);

      // 计算下个月的起始日期
      const nextMonth = new Date(billdata[1]);
      // 日期往后退一个月
      //大于等于        小于等于月1号
      dateFilter.billdata = { $gte: startDate, $lte: nextMonth };
    }

    // 合并查询条件
    const query = { ...baseQuery, ...dateFilter, radio };
    const total = await BillsModel.countDocuments(query)
    console.log(query,'权限',role)
    // console.log(total)
    const data = await BillsModel.find(query).sort({ billdata: -1 }).skip((PageNum - 1) * PageSize).limit(PageSize);
    // console.log(data)
    return {
      data, total
    }
  },
  payBill: async (id) => {
    return BillsModel.updateOne({ _id: id }, { state: 1 })
  }
}
module.exports = BillsService