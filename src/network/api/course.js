import service from './request'

export function getCourses({ pagenum, pagesize }) {
    let url = '/courses?page=' + pagenum + '&page_size=' + pagesize
    return service.get(url)
}

export function createCourse(data) {
    return service.post('/courses', data)
}


export function getNoPagingCourses(queryinfo) {
    let url = queryinfo ? '/courses?queryinfo=' + queryinfo : '/courses'
    return service.get(url)
}

export function getCoursesByClassId(class_id) {
    return service.get('/courses?class_id=' + class_id)
}