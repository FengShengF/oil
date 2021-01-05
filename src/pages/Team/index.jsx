import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Popconfirm, message, Button } from 'antd';
import { getTeamList, deleteTeamServer, updateTeamDetail, addTeamDetail } from './service';
import { getCompanyList } from '../company/service';
import Modal from './Modal.jsx';

const Team = () => {
    const [teamList, setTeamList] = useState('');
    const [companyList, setCompanyList] = useState('');
    const [ModalTitle, setModalTitle] = useState('');
    const [ModalVisible, setModalVisible] = useState(false);
    const [teamDetail, setTeamDetail] = useState({});

    useEffect(() => {
        (async () => {
            getListHoc();
            getCompanyListHoc();
        })();
    }, []);

    const getListHoc = async () => {
        const response = await getTeamList();
        if (response.code === '200') {
            setTeamList(response.data);
        }
    }

    const getCompanyListHoc = async () => {
        const response = await getCompanyList();
        if (response.code === '200') {
            setCompanyList(response.data);
        }
    }

    const modifyTeam = (value) => {
        setModalTitle('修改');
        setModalVisible(true);
        setTeamDetail(value);
    }

    const deleteTeam = async ({ id }) => {
        const res = await deleteTeamServer({ id })
        if (res.code === '200') {
            message.success('成功');
            getListHoc()
        } else {
            message.error(res.msg);
        }
    }

    const addTeam = () => {
        setTeamDetail({});
        setModalVisible(true);
        setModalTitle('新增');
    }

    const handleOk = async () => {
        const { id, teamName, companyId, teamLeader } = teamDetail;
        let res = null;

        if (!teamName || !companyId || !teamLeader) {
            message.error('配置项不正确');
            return;
        }

        if (ModalTitle === '新增') {
            res = await addTeamDetail({ teamName, companyId, teamLeader })
        } else if (ModalTitle === '修改') {
            res = await updateTeamDetail({ id, teamName, companyId, teamLeader })
        }

        if (res.code === '200') {
            message.success('成功');
            setModalVisible(false);
            getListHoc();
        } else {
            message.error(res.msg);
        }
    }

    const columns = [
        {
            title: '队id',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: '队名称',
            dataIndex: 'teamName',
            key: 'teamName',
            align: 'center',
        },
        {
            title: '公司名称',
            dataIndex: 'companyName',
            key: 'companyName',
            align: 'center',
        },
        {
            title: '队长姓名',
            dataIndex: 'teamLeaderName',
            key: 'teamLeaderName',
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'crtDate',
            key: 'crtDate',
            align: 'center',
            render: (text) => text.split('T')[0],
        },
        {
            title: '操作',
            dataIndex: 'tags',
            key: 'tags',
            align: 'center',
            render: (text, record) => (
                <>
                    <a onClick={() => modifyTeam(record)}>
                        修改
                    </a>
                    <Popconfirm
                        title="确定删除?"
                        onConfirm={() => deleteTeam(record)}
                    >
                        <a style={{ marginLeft: 20, color: "red" }}>删除</a>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <PageContainer>
            <Modal
                title={ModalTitle}
                visible={ModalVisible}
                teamDetail={teamDetail}
                handleOk={handleOk}
                handleCancel={() => setModalVisible(false)}
                setTeamDetail={setTeamDetail}
                teamList={teamList}
                companyList={companyList}
            />
            <Card>
                <Button type="primary" style={{ marginBottom: 20 }} onClick={addTeam}>
                    新建团队
                </Button>
                <Table columns={columns} dataSource={teamList} rowKey={(r) => r.id} />
            </Card>
        </PageContainer>
    );
};

export default Team;
