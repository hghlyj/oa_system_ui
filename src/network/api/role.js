import service from './request'


export function getRole({ pagenum, pagesize, department_id }) {
    return service.get('/roles?page=' + pagenum + '&page_size=' + pagesize + '&id=' + department_id)
}


export function addRole(params) {
    return service.post('/roles', params)
}
export function removeRole(id) {
    return service.delete('/roles/' + id)
}

export function getRoleItem(id) {
    return service.get('/roles/' + id)
}

export function editRoleItem(id, data) {
    return service.put('/roles/' + id, data)
}

export function getFilterRoleList(id, content) {
    return service.get('/roles/filter_roles?' + id + '=' + content)
}