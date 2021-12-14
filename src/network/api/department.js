import service from './request'

export function getallDepartment() {
    return service.get('/departments')
}

export function getDepartment(params) {
    let { page, page_size } = params
    return service.get('/departments?page=' + page + '&page_size=' + page_size)
}

export function addDepartment(params) {
    return service.post('/departments', params)
}

export function removeDepartment(id) {
    return service.delete('/departments/' + id)
}

export function getDepartmentItem(id) {
    return service.get('/departments/' + id)
}

export function editDepartmentItem(id, name, label) {
    return service.put('/departments/' + id, { name, label })
}

export function getAllDepartment() {
    return service.get('/departments/all')
}

export function getAllDepartmentColl() {
    return service.get('/departments/allcoll')
}

// 修改教职工 调用根据职位获取保护们
export function getFilterDepaList(id, content) {
    return service.get('/departments/filter_depa?' + id + '=' + content)
}