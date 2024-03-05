import request from "@/utils/request.js";
// 查询公告列表
export const getNewsList = ({ category, Size, Current,title }) => {
    return request.get('/adminapi/news/list', {
        params: {
            category,
            Size,
            Current,
            title
        }
    })
}
// 新闻详情
export const getNewsDetail = (id, views) => {
    return request.get('/adminapi/news/list', {
        params: {
            id,
            views
        }
    })
}
// 热门列表
export const getHotNews = () => {
    return request.get('/adminapi/news/hotlist')
}