import service from './request'


export function getStudents(params) {
    let { search, page, page_size } = params
    const searchstudent = []
    let { name, market, dormnumber, sex, cls } = search
    searchstudent.push({ 'value': name, 'value1': 'name=' + name + '&' })
    searchstudent.push({ 'value': market, 'value1': 'market=' + market + '&' })
    searchstudent.push({ 'value': dormnumber, 'value1': 'dormnumber=' + dormnumber + '&' })
    searchstudent.push({ 'value': sex, 'value1': 'sex=' + sex + '&' })
    searchstudent.push({ 'value': cls, 'value1': 'cls=' + cls + '&' })
    let src = ''
    searchstudent.forEach(item => {
        if (item.value != "") {
            src += item.value1
        }
    })
    if (name != '' || market != '' || dormnumber != '' || sex != '' || cls != '') {
        return service.get('/students?' + src + 'page=' + page + '&page_size=' + page_size)
    }
    return service.get('/students?page=' + page + '&page_size=' + page_size)
}
export function addStudents(params) {
    return service.post('/students', params)
}
export function removeStudents(id) {
    return service.delete('/students/' + id)
}

export function getStudentsItem(id) {
    return service.get('/students/' + id)
}

export function editStudentsItem(content) {
    return service.put('/students/' + content.id, content)
}

export function downloadTemp() {
    return service.get('/students/uploadexcel')
}

export function deletestu(ids) {
    return service.get('/students/delete_stu?ids=' + ids)
}