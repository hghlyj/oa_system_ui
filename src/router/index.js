import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 *没有权限要求的基本页面  
 *所有的角色都可以访问  
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        }]
    },
    {
        path: '/profile',
        component: Layout,
        redirect: '/shooltime/index',
        children: [{
            path: 'index',
            component: () =>
                import ('views/profile/index'),
            name: 'Profile',
            meta: { title: '个人中心', icon: 'people', affix: false }
        }]
    },

    {
        path: '/system',
        component: Layout,
        redirect: '/system/department',
        alwaysShow: true, // will always show the root menu
        name: 'system',
        meta: {
            title: '系统管理',
            icon: 'lock',
        },
        children: [{
            path: 'department',
            name: 'department',
            component: () =>
                import ('views/department/DepartmentList'),
            meta: { title: '部门', icon: 'dashboard', affix: false }
        }, {
            path: 'adminrole',
            name: 'adminrole',
            component: () =>
                import ('views/department/Role'),
            meta: { title: '角色（职位）', icon: 'dashboard', affix: false }
        }, {
            path: 'adminuser',
            name: 'adminuser',
            component: () =>
                import ('views/usermessage/AdminUserDiv'),
            meta: { title: '管理员', icon: 'dashboard', affix: false }
        }, ]
    },

    {
        path: '/collegejw',
        component: Layout,
        redirect: '/collegejw/department',
        alwaysShow: true, // will always show the root menu
        name: 'collegejw',
        meta: {
            title: '学院管理(教务)',
            icon: 'lock',
        },
        children: [{
            path: 'teachingCycle',
            name: 'teachingCycle',
            component: () =>
                import ('views/class/TeachingCycle'),
            meta: { title: '教学周期', icon: 'dashboard', affix: false }
        }, {
            path: 'attendance',
            name: 'attendance',
            component: () =>
                import ('views/class/attendance'),
            meta: { title: '出勤率汇总', icon: 'dashboard', affix: false }
        }, {
            path: 'jshour',
            name: 'jshour',
            component: () =>
                import ('views/class/jshour'),
            meta: { title: '讲师课时', icon: 'dashboard', affix: false }
        }, {
            path: 'classRoom',
            name: 'classRoom',
            component: () =>
                import ('views/class/ClassRoom'),
            meta: { title: '教室管理', icon: 'dashboard', affix: false }
        }, {
            path: 'classList',
            name: 'classList',
            component: () =>
                import ('views/class/classList'),
            meta: { title: '班级管理', icon: 'dashboard', affix: false }
        }, {
            path: 'students',
            name: 'students',
            component: () =>
                import ('views/students/Students'),
            meta: { title: '学生管理', icon: 'dashboard', affix: false }
        }, ]
    },

    {
        path: '/collegexy',
        component: Layout,
        redirect: '/collegexy/department',
        alwaysShow: true, // will always show the root menu
        name: 'collegexy',
        meta: {
            title: '学院管理(学院',
            icon: 'lock',
        },
        children: [{
                path: 'coursestage',
                name: 'coursestage',
                component: () =>
                    import ('views/class/coursestage'),
                meta: { title: '课程阶段', icon: 'dashboard', affix: false }
            }, {
                path: 'coursesystem',
                name: 'coursesystem',
                component: () =>
                    import ('views/class/coursesystem'),
                meta: { title: '课程体系', icon: 'dashboard', affix: false }
            }, {
                path: 'adjustClassTime',
                name: 'adjustClassTime',
                component: () =>
                    import ('views/class/AdjustClassTime'),
                meta: { title: '调课审核', icon: 'dashboard', affix: false }
            }, {
                path: 'callRoll',
                name: 'callRoll',
                component: () =>
                    import ('views/class/CallRoll'),
                meta: { title: '查课', icon: 'dashboard', affix: false }
            },
            {
                path: 'CallRolldetails/:id',
                name: 'CallRolldetails',
                component: () =>
                    import ('views/class/CallRolldetails'),
                meta: { title: '查课信息', icon: 'dashboard', affix: false }
            },
        ]
    },



    {
        path: '/studentScore',
        component: Layout,
        redirect: '/studentScore/Index',
        alwaysShow: true, // will always show the root menu
        name: 'studentScore',
        meta: {
            title: '综合积分管理',
            icon: 'lock',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
                path: 'Index',
                component: () =>
                    import ('views/students/StudentScore/index'),
                name: 'Index',
                meta: {
                    title: '综合积分制度',
                }
            }, {
                path: 'Fdyawa',
                component: () =>
                    import ('views/students/StudentScore/fdyawa.vue'),
                name: 'Fdyawa',
                meta: {
                    title: '导员加分审核',
                    roles: ['admin', 'fdy']
                },

            },
            {
                path: 'Fdysub',
                component: () =>
                    import ('views/students/StudentScore/fdysub.vue'),
                name: 'Fdysub',
                meta: {
                    title: '导员减分审核',
                    roles: ['admin', 'fdy']
                },

            },

            {
                path: 'Dcawa',
                component: () =>
                    import ('views/students/StudentScore/dcawa.vue'),
                name: 'Dcawa',
                meta: {
                    title: '督察加分审核',
                    roles: ['admin', 'dc']
                },

            },
            {
                path: 'Dcsub',
                component: () =>
                    import ('views/students/StudentScore/dcsub.vue'),
                name: 'Dcsub',
                meta: {
                    title: '督察减分审核',
                    roles: ['admin', 'dc']
                },

            },
            {
                path: 'jsshow',
                component: () =>
                    import ('views/students/StudentScore/jsshow'),
                name: 'jsshow',
                meta: {
                    title: '讲师查看',
                    roles: ['admin', 'js']
                },

            },

            {
                path: 'Edit',
                component: () =>
                    import ('views/students/StudentScore/Edit'),
                name: 'Edit',
                meta: {
                    title: '学生加/减分',
                    roles: ['admin', 'fdy', 'dc', 'js']
                },

            },
        ]
    },

    {
        path: '/icon',
        component: Layout,
        children: [{
                path: 'index',
                component: () =>
                    import ('@/views/icons/index'),
                name: 'Icons',
                meta: { title: 'Icon图标', icon: 'icon', noCache: true }
            },

        ]
    },
]

/**
 * asyncRoutes  
 *需要根据用户角色动态加载的路由  
 */
export const asyncRoutes = [
    // {
    //     path: '/shooltime',
    //     component: Layout,
    //     redirect: '/shooltime/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('views/Violation'),
    //         name: 'Shooltime',
    //         meta: { title: '课程表', icon: 'table', affix: false, roles: ['js'] }
    //     }, ]
    // },
    // {
    //     path: '/department',
    //     component: Layout,
    //     redirect: '/department/index',
    //     children: [{
    //         path: 'index',
    //         name: 'Department',
    //         component: () =>
    //             import ('views/department/DepartmentList'),
    //         meta: { title: '部门', icon: 'clipboard', affix: false, roles: ['yuanzhang', 'admin', 'jw'] }
    //     }, ]
    // },
    // {
    //     path: '/adminrole',
    //     component: Layout,
    //     redirect: '/adminrole/index',
    //     children: [{
    //         path: 'index',
    //         name: 'Adminrole',
    //         component: () =>
    //             import ('views/department/Role'),
    //         meta: { title: '角色（职位）', icon: 'tree', affix: false, roles: ['yuanzhang', 'admin', 'jw'] }
    //     }, ]
    // },
    // {
    //     path: '/adminuser',
    //     component: Layout,
    //     redirect: '/adminuser/index',
    //     children: [{
    //         path: 'index',
    //         name: 'Adminuser',
    //         component: () =>
    //             import ('views/usermessage/AdminUserDiv'),
    //         meta: { title: '用户管理', icon: 'exit-fullscreen', affix: false, roles: ['yuanzhang'] }
    //     }, ]
    // },
    // {
    //     path: '/teachingCycle',
    //     component: Layout,
    //     redirect: '/teachingCycle/index',
    //     children: [{
    //         path: 'index',
    //         name: 'TeachingCycle',
    //         component: () =>
    //             import ('views/class/TeachingCycle'),
    //         meta: { title: '教学周期', icon: 'el-icon-set-up', affix: false, roles: ['kz'] }
    //     }, ]
    // },
    // {
    //     path: '/classlist',
    //     component: Layout,
    //     redirect: '/classlist/index',
    //     children: [{
    //         path: 'index',
    //         name: 'ClassList',
    //         component: () =>
    //             import ('views/class/classList'),
    //         meta: { title: '班级', icon: 'el-icon-s-home', affix: false, roles: ['admin', 'kz', 'yuanzhang', 'fay', 'js'] }
    //     }, ]
    // },
    // {
    //     path: '/adjustclasstime',
    //     component: Layout,
    //     redirect: '/classlist/index',
    //     children: [{
    //         path: 'index',
    //         name: 'AdjustClassTime',
    //         component: () =>
    //             import ('views/class/AdjustClassTime'),
    //         meta: { title: '调课审核', icon: 'el-icon-paperclip', affix: false, roles: ['admin', 'kz', 'yuanzhang'] }
    //     }, ]
    // },
    // {
    //     path: '/callroll',
    //     component: Layout,
    //     redirect: '/callroll/index',
    //     children: [{
    //         path: 'index',
    //         name: 'CallRoll',
    //         component: () =>
    //             import ('views/class/CallRoll'),
    //         meta: { title: '查课', icon: 'search', affix: false, roles: ['admin', 'kz'] }
    //     }, ]
    // },
    // {
    //     path: '/callroll/:id',
    //     component: Layout,
    //     redirect: '/callroll/:id/index',
    //     children: [{
    //         path: 'index',
    //         name: 'CallRolldetails',
    //         component: () =>
    //             import ('views/class/CallRolldetails'),
    //         meta: { title: '查课信息', icon: 'education', affix: false, roles: ['admin', 'kz'] }
    //     }, ]
    // },
    // {
    //     path: '/students',
    //     component: Layout,
    //     redirect: '/students/index',
    //     children: [{
    //         path: 'index',
    //         name: 'Students',
    //         component: () =>
    //             import ('views/students/Students'),
    //         meta: { title: '学生', icon: 'peoples', affix: false, roles: ['admin', 'kz', 'yuanzhang', 'fdz', 'js'] }
    //     }, ]
    // },
    // {
    //     path: '/studentScore',
    //     component: Layout,
    //     redirect: '/studentScore/Index',
    //     alwaysShow: true, // will always show the root menu
    //     name: 'studentScore',
    //     meta: {
    //         title: '综合积分管理',
    //         icon: 'lock',
    //         roles: ['admin', 'kz', 'yuanzhang', 'fdz', 'js'] // you can set roles in root nav
    //     },
    //     children: [{
    //             path: 'Index',
    //             component: () =>
    //                 import ('views/students/StudentScore/index'),
    //             name: 'Index',
    //             meta: {
    //                 title: '综合积分制度',
    //                 icon: 'lock',
    //                 roles: ['admin', 'kz', 'yuanzhang', 'fdz', 'js']
    //             }
    //         },
    //         {
    //             path: 'Edit',
    //             component: () =>
    //                 import ('views/students/StudentScore/Edit'),
    //             name: 'Edit',
    //             meta: {
    //                 title: '积分变动处理',
    //                 icon: 'lock',
    //                 roles: ['admin', 'kz', 'yuanzhang', 'fdz', 'js']
    //             }
    //         },
    //         {
    //             path: 'List',
    //             component: () =>
    //                 import ('views/students/StudentScore/List'),
    //             name: 'List',
    //             meta: {
    //                 title: '积分变动列表',
    //                 icon: 'lock',
    //                 roles: ['admin', 'kz', 'yuanzhang', 'fdz', 'js']
    //             }
    //         },
    //     ]
    // },
]




const createRouter = () => new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router