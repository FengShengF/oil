export default {
    'GET /role/list': (req, res) => {
        res.send({
            code: 200,
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
    'PUT /role/update': (req, res) => {
        res.send({
            code: 200
        })
    },
    'DELETE /role/delete/1': (req, res) => {
        res.send({
            code: 200
        })
    },
    'POST /role/add': (req, res) => {
        res.send({
            code: 200
        })
    }
};
