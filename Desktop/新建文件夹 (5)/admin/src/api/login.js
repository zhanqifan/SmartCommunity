import request from "../../utils/request";

export const postLogin = ({ username,password }) => {
    return request.post("/adminapi/user/login", {
            username: username,
            password: password
        }
    )
}

export const gettoken = ()=>{
    return request.get("/adminapi/user/home")
}