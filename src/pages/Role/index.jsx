import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Popconfirm, message, Button } from 'antd';
import { getRoleList, deleteRoleServer, updateRoleDetail, addRoleDetail } from './service';
import { getCompanyList } from '../company/service';
import Modal from './Modal.jsx';

const Role = () => {
    const [roleList, setRoleList] = useState('');
    const [companyList, setCompanyList] = useState('');
    const [ModalTitle, setModalTitle] = useState('');
    const [ModalVisible, setModalVisible] = useState(false);
    const [roleDetail, setRoleDetail] = useState({});

    useEffect(() => {
        (async () => {
            getListHoc();
            getCompanyListHoc();
        })();
    }, []);

    const getListHoc = async () => {
        const response = await getRoleList();
        if (response.code === 200) {
            setRoleList(response.data);
        }
    }

    const getCompanyListHoc = async () => {
        const response = await getCompanyList();
        if (response.code === 200) {
            setCompanyList(response.data);
        }
    }

    const modifyRole = (value) => {
        setModalTitle('修改');
        setModalVisible(true);
        setRoleDetail(value);
    }

    const deleteRole = async ({ id }) => {
        const res = await deleteRoleServer({ id })
        if (res.code === 200) {
            message.success('成功');
            getListHoc()
        } else {
            message.error(res.msg);
        }
    }

    const addRole = () => {
        setRoleDetail({ type: '0' });
        setModalVisible(true);
        setModalTitle('新增');
    }

    const handleOk = async () => {
        const { id, name, type, companyId } = roleDetail;
        let res = null;

        if (!name || !companyId) {
            message.error('配置项不正确');
            return;
        }

        if (ModalTitle === '新增') {
            res = await addRoleDetail({ name, type, companyId })
        } else if (ModalTitle === '修改') {
            res = await updateRoleDetail({ id, name, type, companyId })
        }

        if (res.code === 200) {
            message.success('成功');
            setModalVisible(false);
            getListHoc();
        } else {
            message.error(res.msg);
        }
    }

    const columns = [
        {
            title: '角色id',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '角色类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (text) => ['操作员', '管理员'][text],
        },
        {
            title: '公司名称',
            dataIndex: 'companyName',
            key: 'companyName',
            align: 'center',
        },
        {
            title: '创建者姓名',
            dataIndex: 'crtName',
            key: 'crtName',
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
                    <a onClick={() => modifyRole(record)}>
                        修改
                    </a>
                    <Popconfirm
                        title="确定删除?"
                        onConfirm={() => deleteRole(record)}
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
                roleDetail={roleDetail}
                handleOk={handleOk}
                handleCancel={() => setModalVisible(false)}
                setRoleDetail={setRoleDetail}
                roleList={roleList}
                companyList={companyList}
            />
            <Card>
                <Button type="primary" style={{ marginBottom: 20 }} onClick={addRole}>
                    新建角色
                </Button>
                <Table columns={columns} dataSource={roleList} rowKey={(r) => r.id} />
            </Card>
        </PageContainer>
    );
};

export default Role;
