export default {
    'GET /user/list': (req, res) => {
        res.send({
            code: '200',
            msg: '获取成功',
            data: [
                {
                    id: '1',
                    userName: 'admin',
                    name: '张三',
                    companyId: '1',
                    teamId: '1',
                    age: 29,
                    sex: '男',
                    type: 0,
                    phone: '111111111',
                    credate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: 1,
                    updDate: '2020-12-06T11:34:46.000+0000'
                },
                {
                    id: '2',
                    userName: 'admin',
                    name: '张三2',
                    companyId: '1',
                    teamId: '1',
                    age: 1,
                    sex: '女',
                    type: 1,
                    phone: '111111111',
                    credate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: 1,
                    updDate: '2020-12-06T11:34:46.000+0000'
                },
                {
                    id: '3',
                    userName: 'admin3',
                    name: '张三23',
                    companyId: '1',
                    teamId: '1',
                    age: 1,
                    sex: '女',
                    type: 2,
                    phone: '111111111',
                    credate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: 1,
                    updDate: '2020-12-06T11:34:46.000+0000'
                },
            ],
        });
    },
    'PUT /user/update': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'DELETE /user/delete/1': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'POST /user/add': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'GET /userRole/getRoleList/1': (req, res) => {
        res.send({
            code: '200',
            msg: '获取成功',
            data: [
                {
                    id: '1',
                    name: '角色1',
                    type: 0,
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: 1,
                    selected: false
                },
                {
                    id: '2',
                    name: '角色2',
                    type: 1,
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: 1,
                    selected: true
                },
                {
                    id: '3',
                    name: '角色3',
                    type: 0,
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: 1,
                    selected: true
                },
            ],
        });
    },
    'POST /userRole/addList': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'DELETE /userRole/deleteList': (req, res) => {
        res.send({
            code: '200'
        })
    },

};
