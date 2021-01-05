import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Popconfirm, message, Button } from 'antd';
import { getUserList, updateUserDetail, deleteUserServer, addUserDetail, getRoleList, addUserRole, deleteUserRole } from './service';
import { getCompanyList } from '../company/service';
import { getTeamList } from '../team/service';
import Modal from './Modal.jsx';
import RoleModal from './RoleModal.jsx';

const User = () => {
    //公司列表
    const [companyList, setCompanyList] = useState('');
    //团队列表
    const [teamList, setTeamList] = useState('');
    //角色列表
    const [modifyId, setModifyId] = useState([]);
    const [option, setOption] = useState([]);
    const [optionKeys, setOptionKeys] = useState([]);
    const [roleModalVisible, setRoleModalVisible] = useState(false);
    //用户相关
    const [userList, setUserList] = useState('');
    const [ModalTitle, setModalTitle] = useState('');
    const [ModalVisible, setModalVisible] = useState(false);
    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
        (async () => {
            getListHoc();
            getCompanyListHoc();
            getTeamListHoc();
        })();
    }, []);
    //获取公司列表
    const getCompanyListHoc = async () => {
        const response = await getCompanyList();
        if (response.code === '200') {
            setCompanyList(response.data);
        }
    }
    //获取团队列表
    const getTeamListHoc = async () => {
        const response = await getTeamList();
        if (response.code === '200') {
            setTeamList(response.data);
        }
    }
    //增加用户
    const addUser = () => {
        setUserDetail({});
        setModalVisible(true);
        setModalTitle('新增');
    }
    //删除用户
    const deleteUser = async ({ id }) => {
        const res = await deleteUserServer({ id })
        if (res.code === '200') {
            message.success('成功');
            getListHoc();
        } else {
            message.error(res.msg);
        }
    }
    //修改用户
    const modifyUser = (value) => {
        setModalTitle('修改');
        setModalVisible(true);
        setUserDetail(value);
    }
    //查找用户
    const getListHoc = async () => {
        const response = await getUserList();
        if (response.code === '200') {
            setUserList(response.data);
        }
    }
    //新增&&修改
    const handleOk = async () => {
        const { userName, password, name, companyId, age, sex, type, isLeader } = userDetail;
        if (!userName || !password || !name || !companyId || !age || !sex || (!type && type != '0') || (!isLeader&& isLeader != '0')) {
            message.error('配置项不正确!');
            return;
        }
        let res = null;

        if (ModalTitle === '新增') {
            res = await addUserDetail(userDetail)
        } else if (ModalTitle === '修改') {
            res = await updateUserDetail(userDetail)
        }

        if (res.code === '200') {
            message.success('成功');
            setModalVisible(false);
            getListHoc()
        } else {
            message.error(res.msg);
        }
    }

    //角色相关
    //修改角色
    const modifyRole = async ({ id }, visible) => {
        setModifyId(id)
        const res = await getRoleList({ id });
        if (res.code === '200') {
            setCheckedOptions(res.data, id);
            setRoleModalVisible(visible)
        } else {
            message.error(res.msg);
        }
    }
    //处理多选框数据
    const setCheckedOptions = (data, userId) => {
        let options = [];
        let keys = [];
        let deleteData = [];

        data && data.map(item => {
            item.selected ? keys.push(item.id) : null;
            options.push({
                label: item.name,
                value: item.id
            });
            deleteData.push({
                roleId: item.id,
                userId
            })
        })

        setOption(options)
        setOptionKeys(keys)

        return deleteData;
    }
    //确认保存
    const roleHandleOk = async () => {
        let keys = [];
        optionKeys.map(item => {
            keys.push({
                roleId: item,
                userId: modifyId
            })
        })

        const res = await addUserRole(keys);
        if (res.code === '200') {
            message.success('成功')
            setRoleModalVisible(false)
        } else {
            message.error(res.msg)
        }
    }
    //删除角色
    const deleteRole = async ({ id }) => {
        setModifyId(id)
        const res = await getRoleList({ id });
        if (res.code === '200') {
            const deleteData = setCheckedOptions(res.data, id);
            const res1 = await deleteUserRole(deleteData);
            if (res1 === '200') {
                message.error('成功');
                return
            }
            message.error(res.msg);
        } else {
            message.error(res.msg);
        }
    }


    const columns = [
        {
            title: '公司',
            dataIndex: 'companyName',
            key: 'companyName',
            align: 'center',
        },
        {
            title: '队',
            dataIndex: 'teamName',
            key: 'teamName',
            align: 'center',
        },
        {
            title: '是否公司负责人',
            dataIndex: 'isLeader',
            key: 'isLeader',
            align: 'center',
            render: text => (
                ['否', '是'][Number(text)]
            )
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
                ['admin', '管理人员', '操作员'][Number(text)]
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
                        修改用户
                    </a>
                    <Popconfirm
                        title="确定删除?"
                        onConfirm={() => deleteUser(record)}
                    >
                        <a style={{ marginLeft: 20, color: "red" }}>删除用户</a>
                    </Popconfirm>
                    <br />
                    <a onClick={() => modifyRole(record, true)}>
                        修改角色
                    </a>
                    <Popconfirm
                        title="确定删除?"
                        onConfirm={() => deleteRole(record)}
                    >
                        <a style={{ marginLeft: 20, color: "red" }}>删除角色</a>
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
                companyList={companyList}
                teamList={teamList}
            />
            <RoleModal
                title={'角色选择'}
                visible={roleModalVisible}
                option={option}
                optionKeys={optionKeys}
                setOptionKeys={setOptionKeys}
                handleOk={roleHandleOk}
                handleCancel={() => setRoleModalVisible(false)}
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
