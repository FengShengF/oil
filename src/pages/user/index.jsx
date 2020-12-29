import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Popconfirm, message, Button } from 'antd';
import { getUserList, updateUserDetail, deleteUserServer, addUserDetail } from './service';
import Modal from './Modal.jsx';

const User = () => {
    const [userList, setUserList] = useState('');
    const [ModalTitle, setModalTitle] = useState('');
    const [ModalVisible, setModalVisible] = useState(false);
    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
        (async () => {
            getListHoc()
        })();
    }, []);

    const getListHoc = async () => {
        const response = await getUserList();
        if (response.code === 200) {
            setUserList(response.data);
        }
    }

    const modifyUser = (value) => {
        setModalTitle('修改');
        setModalVisible(true);
        setUserDetail(value);
    }

    const deleteUser = async ({ id }) => {
        const res = await deleteUserServer({ id })
        if (res.code === 200) {
            message.success('成功');
            getListHoc();
        } else {
            message.error(res.msg);
        }
    }

    const addUser = () => {
        setUserDetail({});
        setModalVisible(true);
        setModalTitle('新增');
    }

    const handleOk = async () => {
        // const { userName, password, name, companyId, teamId, age, sex, type, phone, isLeader } = userDetail;
        let res = null;

        if (ModalTitle === '新增') {
            res = await addUserDetail(userDetail)
        } else if (ModalTitle === '修改') {
            res = await updateUserDetail(userDetail)
        }

        if (res.code === 200) {
            message.success('成功');
            setModalVisible(false);
            getListHoc()
        } else {
            message.error(res.msg);
        }
    }


    const columns = [
        {
            title: '账号',
            dataIndex: 'userName',
            key: 'userName',
            align: 'center',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            align: 'center',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            align: 'center',
        },
        {
            title: '用户类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: text => (
                ['admin', '管理人员', '操作员'][text]
            )
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'credate',
            key: 'credate',
            align: 'center',
            render: (text) => text.split('T')[0],
        },
        {
            title: '更新时间',
            dataIndex: 'updDate',
            key: 'updDate',
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
                    <a onClick={() => modifyUser(record)}>
                        修改
                    </a>
                    <Popconfirm
                        title="确定删除?"
                        onConfirm={() => deleteUser(record)}
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
                userDetail={userDetail}
                handleOk={handleOk}
                handleCancel={() => setModalVisible(false)}
                setUserDetail={setUserDetail}
            />
            <Card>
                <Button type="primary" style={{ marginBottom: 20 }} onClick={addUser}>
                    新建用户
                </Button>
                <Table columns={columns} dataSource={userList} rowKey={(r) => r.id} />
            </Card>
        </PageContainer>
    );
};

export default User;
