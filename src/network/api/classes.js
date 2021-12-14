import service from './request'

export function getallClasses() {
    return service.get('/classes')
}

export function getClasses(params) {
    let { search, page, page_size } = params
    const searchstudent = []
    let { name, college, stage, sum } = search
    searchstudent.push({ 'value': name, 'value1': 'name=' + name + '&' })
    searchstudent.push({ 'value': college, 'value1': 'college=' + college + '&' })
    searchstudent.push({ 'value': stage, 'value1': 'stage=' + stage + '&' })
    searchstudent.push({ 'value': sum, 'value1': 'sum=' + sum + '&' })
    let src = ''
    searchstudent.forEach(item => {
        if (item.value != "") {
            src += item.value1
        }
    })
    if (name != '' || college != '' || stage != '' || sum != '') {
        return service.get('/classes?' + src + 'page=' + page + '&page_size=' + page_size)
    }
    return service.get('/classes?page=' + page + '&page_size=' + page_size)
}
export function addClasses(params) {
    console.log(params);
    return service.post('/classes', params)
}
export function removeClasses(id) {
    return service.delete('/classes/' + id)
}

export function getClassesItem(id) {
    return service.get('/classes/' + id)
}

export function editClassesItem(content) {
    return service.put('/classes/' + content.id, content)
}


export function getcollcls(id) {
    return service.get('/classes/filter_cls?id=' + id)
}



export function getClass({ pagenum, pagesize, department }) {
    return service.get('/classroom?page=' + pagenum + '&page_size=' + pagesize + '&id=' + department)
}


export function addClass(params) {
    return service.post('/classroom', params)
}
export function removeClass(id) {
    return service.delete('/classroom/' + id)
}

export function getClassItem(id) {
    return service.get('/classroom/' + id)
}

export function editClassItem(id, data) {
    return service.put('/classroom/' + id, data)
}