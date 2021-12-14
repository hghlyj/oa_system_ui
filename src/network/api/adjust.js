import service from './request'


export function addAdjustClass(data) {
    return service.put('/usercourseplans', data)
}

//获取调课信息
export function GetasjustClas() {
    return service.get('/getasjustClas')
}


//修改调课状态
export function EditadjustState(id, content) {
    return service.put('/adjustclasstime/' + id, content)
}

//获取点名信息
export function getclasssections() {
    return service.get('/class-sections')
}

//获取点名信息（同学）
export function getStudents(id) {
    return service.get('/class_timetables/' + id)
}

//提交点名信息
export function rollCalltijiao(id, data) {
    return service.put('/class_timetables/' + id, data)
}