import service from './request'

export function getNoPagedCollegeStage(queryinfo) {
    let url = queryinfo ? '/college_stages?queryinfo=' + queryinfo : '/college_stages'
    return service.get(url)
}
// 根据学院id获取学院的阶段
export function getCollegeStageByCollegeId(college_id) {
    return service.get('/college_stages?queryinfo=nopaging&college_id=' + college_id)

}

export function getCollegeStage({ pagenum, pagesize }) {
    let url = '/college_stages?page=' + pagenum + '&page_size=' + pagesize
    return service.get(url)
}

export function createCollegeStage(data) {
    return service.post('/college_stages', data)
}