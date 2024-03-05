import request from "@/utils/request.js";

// 注册
export const RegisterApi = (data) =>{
     return request.post('/adminapi/user/register',data)
}

export const postLogin = ({ username,password }) => {
    return request.post("/adminapi/user/login", {
            username: username,
            password: password
        }
    )
}

