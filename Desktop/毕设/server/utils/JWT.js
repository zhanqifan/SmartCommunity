const jsonwebtoken = require("jsonwebtoken")//pnpm i jsonwebtoken
const secret = "vencient"
const JWT = {
    generate(value, expires) {    //命名 密钥   过期时间 
        return jsonwebtoken.sign(value, secret, { expiresIn: expires })
    },
    verify(token) {         //token  密钥用来解密
        try {
            return jsonwebtoken.verify(token, secret)
        }
        catch (e) {
            return false
        }
    }
}
//             //   生成token
// const token =  JWT.generate({name:"xx"},"10s")
// // console.log(JWT.verify(token))
// setTimeout(()=>{
//     console.log(JWT.verify(token))//c测试11秒token是否还在
// },11000)
module.exports = JWT