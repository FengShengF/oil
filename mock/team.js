export default {
    'GET /team/list': (req, res) => {
        res.send({
            code: '200',
            msg: '获取成功',
            data: [
                {
                    id: '1',
                    teamName: '队名1',
                    companyId: '2',
                    companyName: '公司名称2',
                    teamLeader: '1-1-leader',
                    teamLeaderName: '队长姓名1',
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '2',
                },
                {
                    id: '2',
                    teamName: '队名2',
                    companyId: '2-comId',
                    companyName: '公司名称2',
                    teamLeader: '2-2-leader',
                    teamLeaderName: '队长姓名2',
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '22',
                },
                {
                    id: '3',
                    teamName: '队名3',
                    companyId: '3-comId',
                    companyName: '公司名称3',
                    teamLeader: '3-3-leader',
                    teamLeaderName: '队长姓名3',
                    crtDate: '2020-12-06T11:34:46.000+0000',
                    crtUserId: '33',
                },
            ],
        });
    },
    'PUT /team/update': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'DELETE /team/delete/1': (req, res) => {
        res.send({
            code: '200'
        })
    },
    'POST /team/add': (req, res) => {
        res.send({
            code: '200'
        })
    }
};
