import moment from 'moment'
moment.locale("zh-cn"); 
export const formatTime = (data) =>{
    // return moment(data).local().format('YYYY-MM-DD-HH:mm');//完整时间
    return moment(data).local().format('YYYY-MM-DD');
}
export const formatTimeMM = (data) =>{
    // return moment(data).local().format('YYYY-MM-DD-HH:mm');//完整时间
    return moment(data).local().format('YYYY-MM-DD HH:mm');
}
// 只有到月
export const formatTimeMonth = (data) =>{
    // return moment(data).local().format('YYYY-MM-DD-HH:mm');//完整时间
    return moment(data).local().format('YYYY-MM');
}

