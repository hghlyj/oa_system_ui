import service from './request'

export function createCoursePian(params) {
    return service.post('/coursepian', params)
}


//获取一条排课信息   看这个班级是否排课
export function getcoursepianone() {
    return service.get('/coursepian/all')
}

//修改排课信息
export function editCoursePian(content) {
    return service.put('/coursepian/' + content.id, content)
}

//删除排课信息
export function delesourseClasses(id) {
    return service.delete('/coursepian/' + id)
}

//课程
export function getcoursesall(content) {
    return service.get('/courses/all?part=' + content)
}

//教室号获取
export function getClassRoom(content) {
    return service.get('/classroom/all?part=' + content)
}

//教师号添加
export function createClassRoom(params) {
    return service.post('/classroom', params)
}