const alipaySdk = require('../../alipay/alipay.config')//引配置好的支付宝文件
const AlipayFormData = require('alipay-sdk/lib/form').default
const axios =require('axios')
const BillsService = require('../../services/admin/BillsService')
const BillsControl = {
    addBill: async (req, res) => {
        await BillsService.addBill(req.body)
        res.send({
            code: 200,
            msg: '添加成功'
        })
    },
    // 物业人员 应该返回所有账单查哪家那户的物业费 住户只给他的
    findBill: async (req, res) => {
        const {billdata,address,role,Size,Current,radio}=req.query
                              //  是否为用户 是就传住宅号进去
        const {data,total} =await BillsService.findBill(billdata,address,role,Size,Current,radio)
        res.send({
            code: 200,
            msg: '查询成功',
            data,
            total
        })
    },
    // 去支付
    payBill: async (req, res) => {
        let {orderId,cost,name} = req.body
        const formData = new AlipayFormData()
        formData.setMethod('get')
        formData.addField('returnUrl', 'http://127.0.0.1:5173/paysuccess');//这是支付完的跳转回来的路径
        formData.addField('bizContent', ({
            outTradeNo: orderId,
            productCode: 'FAST_INSTANT_TRADE_PAY',
            totalAmount: cost,//总价
            subject: name,
            body: '缴费',//水电缴费 物业缴费
          }));
          const result = await alipaySdk.exec(
            'alipay.trade.page.pay',
            {},
            { formData: formData },
          );
          res.send({
            code: 200,
            msg:'正在等待跳转',
            result
          })
    },
    // 支付完成后
    resultBill: async(req, res) => {
      let out_trade_no = req.body.out_trade_no
      let trade_no = req.body.trade_no
      const formData = new AlipayFormData()
      formData.setMethod('get')
      formData.addField('bizContent', ({
        out_trade_no,
        trade_no
      }));
      const result = await alipaySdk.exec(
        'alipay.trade.query',
        {},
        { formData: formData },
      );
      // console.log(result)
      axios({
        url: result,
        method: "get"
      }).then(async data => {
        console.log('走到这')
        let r = data.data.alipay_trade_query_response;
        console.log('响应r',r)
        if (r.code === '10000') {
          switch (r.trade_status) {
            case 'WAIT_BUYER_PAY ':
              res.send({
                success: true,
                code: 200,
                msg: '支付宝有交易记录,没付款'
              })
              break;
            case 'TRADE_FINISHED':
              await BillsService.payBill(out_trade_no)
              res.send({
                success: true,
                code: 200,
                msg: '交易完成,不可以退款'
              })
              break;
            case 'TRADE_SUCCESS':
            await BillsService.payBill(out_trade_no)
              res.send({
                success: true,
                code: 200,
                msg: '交易完成'
              })
              break;
              case 'TRADE_CLOSED':
              res.send({
                success: true,
                code: 200,
                msg: '交易关闭'
              })
              break;
          }
        }
        else if(r.code === '40004'){
          res.send({
            code:200,
            msg:'交易不存在'
          })
        }
      }).catch(err => {
        res.send({
          msg: '查询失败'
        })
      })
    }}
module.exports = BillsControl