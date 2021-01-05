export default {
    'GET /company/list': (req, res) => {
        res.send({
            code: '200',
            msg: '获取成功',
            data: [
                {
                    id: '1',
                    companyName: '公司1',
                    pid: '3',
                    credate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '11',
                    parentName: '公司1-父',
                },
                {
                    id: '2',
                    companyName: '公司2',
                    pid: '-1',
                    credate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '22',
                    parentName: '公司2-父',
                },
                {
                    id: '3',
                    companyName: '公司3',
                    pid: '3-3',
                    credate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '33',
                    parentName: '公司3-父',
                },
            ],
        });
    },
    'PUT /company/update': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'DELETE /company/delete/1': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'POST /company/add': (req, res) => {
        res.send({
            code: '200'
        })
    }
};
