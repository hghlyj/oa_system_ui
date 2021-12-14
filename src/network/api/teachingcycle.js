import service from './request'


export function getallcourse() {
    return service.get('/teachingtime?queryinfo' + '=' + 'activated')
}

export function gettodaycourse() {
    return service.get('/teachingtime?queryinfo = current')
}

export function getTeaching(pagenum, pagesize) {
    return service.get('/teachingtime?page=' + pagenum + '&page_size=' + pagesize)
}


export function addTeaching(params) {
    const content = JSON.stringify(params)
    let content2 = JSON.parse(content)
    content2.no_class = String(content2.no_class);
    content2.am_class = String(content2.am_class);
    content2.pm_class = String(content2.pm_class);
    return service.post('/teachingtime', content2)
}
export function removeTeaching(id) {
    return service.delete('/teachingtime/' + id)
}

export function getTeachingItem(id) {
    console.log(id, 55555)
    return service.get('/teachingtime/' + id)
}

export function editTeachingItem(id, data) {
    return service.put('/teachingtime/' + id, data)
}