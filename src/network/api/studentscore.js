import service from './request'

//获取响应适度的描述信息    （过滤功能）
export function GetPutIntoEffect(id) {
    return service.get('/putintoeffect?id=' + id)
}

//加分模板

export function GetAwardedMarkss(content1) {
    const { query, page, page_size } = content1
    const search = []
    let { content } = query
    search.push({ 'value': content, 'value1': 'content=' + content + '&' })
    let src = ''
    search.forEach(item => {
        if (item.value == "" || item.value == null) {
            return;
        } else {
            src += item.value1
        }
    })
    if (content != '') {
        return service.get('/awardedmarkss?' + src + 'page=' + page + '&page_size=' + page_size)
    } else {
        return service.get('/awardedmarkss?page=' + page + '&page_size=' + page_size)
    }
}
export function noGetAwardedMarkss() {
    return service.get('/awardedmarkss?no=1')
}
export function GetAwardedMarkssOne(id) {
    return service.get('/awardedmarkss/' + id)
}

export function CreateAwardedMarkss(data) {
    return service.post('/awardedmarkss', data)
}

export function UpdateAwardedMarkss(id, data) {
    return service.put('/awardedmarkss/' + id, data)
}

export function DeleteAwardedMarkss(id) {
    return service.delete('/awardedmarkss/' + id, )
}


//违纪类型获取    (增删改查完善？？？？？)
export function GetDisciplinetypes() {
    return service.get('/disciplinetypes')
}

//扣分
export function GetSubtractMarks(content1) {
    const { query, page, page_size } = content1
    const search = []
    let { Disciplinetype, content } = query
    search.push({ 'value': Disciplinetype, 'value1': 'Disciplinetype=' + Disciplinetype + '&' })
    search.push({ 'value': content, 'value1': 'content=' + content + '&' })
    let src = ''
    search.forEach(item => {
            if (item.value == "" || item.value == null) {
                return;
            } else {
                src += item.value1
            }
        })
        // if (Disciplinetype != '' || market != '' || dormnumber != '' || sex != '' || cls != '') {
    if (Disciplinetype != null || content != '') {
        return service.get('/subtractmarkss?' + src + 'page=' + page + '&page_size=' + page_size)
    } else {
        return service.get('/subtractmarkss?page=' + page + '&page_size=' + page_size)
    }



}
export function noGetSubtractMarks() {
    return service.get('/subtractmarkss?no=1')

}
export function GetSubtractMarksOne(id) {
    return service.get('/subtractmarkss/' + id)
}

export function CreateSubtractMarks(data) {
    return service.post('/subtractmarkssw', data)
}

export function UpdateSubtractMarks(id, data) {
    return service.put('/subtractmarkssw/' + id, data)
}

export function DeleteSubtractMarks(id) {
    return service.delete('/subtractmarkss/' + id, )
}



//加减分查询
export function GetMarksLists(content1) {
    const { query, page, page_size } = content1
    const search = []
    let { state, name, department, cls, lecturer, counsellor, market, status } = query
    search.push({ 'value': name, 'value1': 'name=' + name + '&' })
    search.push({ 'value': department, 'value1': 'department=' + department + '&' })
    search.push({ 'value': cls, 'value1': 'cls=' + cls + '&' })
    search.push({ 'value': lecturer, 'value1': 'lecturer=' + lecturer + '&' })
    search.push({ 'value': counsellor, 'value1': 'counsellor=' + counsellor + '&' })
    search.push({ 'value': market, 'value1': 'market=' + market + '&' })
    search.push({ 'value': state, 'value1': 'state=' + state + '&' })
    search.push({ 'value': status, 'value1': 'status=' + status + '&' })
    console.log(1111111111111, status);
    let src = ''

    if (state) {
        //有违纪的src
        // let { name } = query
        // search.push({ 'value': name, 'value1': 'name=' + name + '&' })

    } else {
        //没有违纪的src
        // let { name } = query
        // search.push({ 'value': name, 'value1': 'name=' + name + '&' })

    }

    search.forEach(item => {
        if (item.value == "" && typeof(item.value) == 'boolean') {
            src += item.value1
        } else if (item.value == "" || item.value == null) {
            return;
        } else {
            src += item.value1
        }
    })
    if (state != null || state != '' || state != undefined) {
        return service.get('/markslists?' + src + 'page=' + page + '&page_size=' + page_size)
    } else {
        return service.get('/markslists?page=' + page + '&page_size=' + page_size)
    }
}

//单个状态   局部修改
export function EditMarksLists(id, content) {
    console.log(content, 121212);
    return service.put('/markslists/' + id, content)
}