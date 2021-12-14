import service from './request'
import queryString from '../../utils/querystring'
//获取讲师的所有课表
export function getClassTimeTable({ pagenum, pagesize }) {
    return service.get('/point_name_tables?page=' + pagenum + '&page_size=' + pagesize)
}

//根据课表id获取所有的学生点名信息
export function getRollCallInfo(id) {
    return service.get('/class_timetables/' + id)
}

//点名
export function rollCall(id, data) {
    return service.put('/class_timetables/' + id, data)
}

//统计课时
export function getClassHours({ tc_id, college_id }) {
    return service.get('/class_sections?tc_id=' + tc_id + '&college_id=' + college_id)
}
//统计某个老师的详细课时数据
export function getClassHourInfo(tc_id, lecturer_id) {
    return service.get('/user_class_sections?tc_id=' + tc_id + '&lecturer_id=' + lecturer_id)
}

//获取班级出勤率 
export function getClassAttendances(params) {
    //http://xxxx.com/xxx?tc_id=xxx&college_id=xx
    let search = queryString(params)
    return service.get('/class_attendances?' + search)
}