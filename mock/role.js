export default {
    'GET /role/list': (req, res) => {
        res.send({
            code: '200',
            msg: '获取成功',
            data: [
                {
                    id: '1',
                    name: '角色1',
                    type: '0',
                    companyId: '1',
                    companyName: '公司名称1',
                    crtName: '创建者1',
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '1',
                },
                {
                    id: '2',
                    name: '角色2',
                    type: '1',
                    companyId: '2',
                    companyName: '公司名称2',
                    crtName: '创建者2',
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '2',
                },
                {
                    id: '3',
                    name: '角色3',
                    type: '0',
                    companyId: '3',
                    companyName: '公司名称3',
                    crtName: '创建者3',
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '3',
                },
            ],
        });
    },
    'GET /roleMenu/getMenuList/1': (req, res) => {
        res.send({
            code: '200',
            msg: '获取成功',
            data: [{
                id: '1',
                name: '权限管理',
                code: 'permissionManager',
                parentId: '-1',
                href: '',
                orderNum: 0,
                description: '权限管理',
                path: '/permissionManager',
                type: '1',
                crtDate: '2020-12-06T11:34:46.000+0000',
                crtUserId: '1',
                selected: false,
            }, {
                id: '1-1',
                name: '分队管理',
                code: 'companyManager',
                parentId: '1',
                href: '',
                orderNum: 0,
                description: '分队管理',
                path: '/permissionManager/companyManager',
                type: '1',
                crtDate: '2020-12-06T11:34:46.000+0000',
                crtUserId: '1',
                selected: true,
            }, {
                id: '1-2',
                name: '用户关联角色',
                code: 'userRoleManager',
                parentId: '1',
                href: '',
                orderNum: 1,
                description: '用户关联角色',
                path: '/permissionManager/userRoleManager',
                type: '1',
                crtDate: '2020-12-06T11:34:46.000+0000',
                crtUserId: '1',
                selected: true,
            }, {
                id: '1-3',
                name: '角色管理',
                code: 'roleManager',
                parentId: '1',
                href: '',
                orderNum: 2,
                description: '角色管理',
                path: '/permissionManager/roleManager',
                type: '1',
                crtDate: '2020-12-06T11:34:46.000+0000',
                crtUserId: '1',
                selected: false,
            }, {
                id: '2',
                name: '设备管理',
                code: 'equipmentManager',
                parentId: '-1',
                href: '',
                orderNum: 1,
                description: '设备管理',
                path: '/equipmentManager',
                type: '1',
                crtDate: '2020-12-06T11:34:46.000+0000',
                crtUserId: '1',
                selected: false,
            }, {
                id: '2-1',
                name: '油井管理',
                code: 'oliManager',
                parentId: '2',
                href: '',
                orderNum: 0,
                description: '油井管理',
                path: '/equipmentManager/oliManager',
                type: '1',
                crtDate: '2020-12-06T11:34:46.000+0000',
                crtUserId: '1',
                selected: false,
            }]
        })
    },
    'PUT /role/update': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'DELETE /role/delete/1': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'POST /role/add': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'POST  /roleMenu/addList': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'DELETE /roleMenu/deleteList': (req, res) => {
        res.send({
            code: '200'
        })
    },
};
