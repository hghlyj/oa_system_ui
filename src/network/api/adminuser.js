import service from './request'


// 后台登录接口
export function Login(data) {
    return service.post('/login', data)
}
//展示教职工列表
export function GetAdminUser(params) {
    let { page, page_size } = params
    return service.get('/adminusers?page=' + page + '&page_size=' + page_size)
}
//添加教职工
export function addAdminUser(params) {
    return service.post('/adminusers', params)
}
//删除
export function removeAdminUser(id) {
    return service.delete('/adminusers/' + id)
}
//获取单条
export function getAdminUserItem(id) {
    return service.get('/adminusers/' + id)
}
//修改状态
export function editAdminUserItem(content) {
    let { id, is_active } = content
    return service.put('/adminusers/' + id, { 'is_active': is_active })
}

//修改教职工
export function editAdminUsersItem(content) {
    return service.put('/adminusers/' + content.id, content)
}

export function deleteadminrole(depar_id, role_id) {
    return service.delete('/adminusers/deleteadminrole?depar_id=' + depar_id + '&role_id=' + role_id)
}

//获取讲师信息
export function getAdminUserjs(ad) {
    return service.get('/adminusers/filter_js?part=' + ad)
}

//获取导员信息
export function getAdminUserfdy(ad) {
    return service.get('/adminusers/filter_fdy?part=' + ad)
}

//获取某个学院所有的讲师和导员
export function getTeacherByClassId(class_id, type) {
    return service.get('/adminusers?cls_id=' + class_id + '&type=' + type)
}

//获取讲师带的班级
export function getAdjuClass() {
    return service.get('/adminusers/adjuclass')
}