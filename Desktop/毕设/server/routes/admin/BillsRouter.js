const express = require('express');
const BillRouter =express.Router();
const BillsControl = require("../../controllers/admin/BillsControl")
BillRouter.use(express.urlencoded({ extended: true }))
BillRouter.post('/adminapi/addbill',BillsControl.addBill)//添加账单
BillRouter.get('/adminapi/findbill',BillsControl.findBill)//查询账单
BillRouter.post('/adminapi/paybill',BillsControl.payBill)//支付账单
BillRouter.post('/adminapi/resultbill',BillsControl.resultBill)//支付账单
module.exports=BillRouter