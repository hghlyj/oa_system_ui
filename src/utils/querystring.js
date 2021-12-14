//{page:1,name:zs,age:18}  ===> page=1&name=zs&age=18
export default function(paramObj) {

    return Object.keys(paramObj).map(key => {
        if (paramObj[key]) {
            return `${key}=${paramObj[key]}`
        }
    }).join('&')
}