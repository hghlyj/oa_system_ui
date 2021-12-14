import { getToken, setToken, removeToken, setId } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getAdminUserItem } from 'network/api/adminuser'
import { Login } from "network/api/adminuser";


const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    // SET_INTRODUCTION: (state, introduction) => {
    //     state.introduction = introduction
    // },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
}

const actions = {
    adminlogin({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            Login(userInfo).then(res => {
                commit('SET_TOKEN', res.access)
                window.sessionStorage.setItem('id', res.id);
                setToken(res.access)
                setId(res.id)
                resolve()
            }).catch(error => {
                reject()
            })
        })
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getAdminUserItem(sessionStorage.getItem('userid')).then(res => {
                console.log(456789, res)
                let roles = []
                const name = res.name
                const avatar = res.avatar
                console.log(res, '我的信息')
                if (res.username == 'admin') {
                    roles.push('admin')
                } else {
                    if (!res.Role || res.Role.length <= 0) {
                        reject('getInfo:角色必须是一个非空数组!')
                    }
                }

                res.Role.forEach((item) => {
                    //学院
                    if (item.department) {
                        //院长
                        if (item.level == 1) {
                            roles.push('yuanzhang')
                        }
                        //主任   （教学   学院）
                        if (item.level == 2) {
                            if (item.duty == '教学') {
                                roles.push('jszr')
                            }
                            if (item.duty == '学管') {
                                roles.push('xgzr')
                            }
                        }
                        //讲师  导员
                        if (item.level == 3) {
                            if (item.duty == '教学') {
                                roles.push('js')
                            }
                            if (item.duty == '学管') {
                                roles.push('fdy')
                            }
                        }
                    } else {
                        //处长   暂无其他权限
                        if (item.level == 1) {
                            roles.push('cz')
                        }
                        //科长
                        if (item.level == 2) {
                            roles.push('kz')
                        }
                        //成员
                        if (item.level == 3) {
                            roles.push('cy')
                        }
                    }
                })
                let data = {}
                commit('SET_ROLES', roles);
                commit('SET_NAME', name);
                //头像
                commit('SET_AVATAR', avatar)
                data.roles = roles;
                data.name = name;
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 退出登录
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {

            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()

            resetRouter()
                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
            dispatch('tagsView/delAllViews', null, { root: true })
            resolve()
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'

        commit('SET_TOKEN', token)
        setToken(token)

        const { roles } = await dispatch('getInfo')

        resetRouter()

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('nodepermission/generateRoutes', roles, { root: true })
            // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}