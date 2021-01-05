import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Popconfirm, message, Button } from 'antd';
import { getCompanyList, updateCompanyDetail, deleteCompanyServer, addCompanyDetail } from './service';
import Modal from './Modal.jsx';

const Company = () => {
    const [companyList, setCompanyList] = useState('');
    const [ModalTitle, setModalTitle] = useState('');
    const [ModalVisible, setModalVisible] = useState(false);
    const [companyDetail, setCompanyDetail] = useState({});

    useEffect(() => {
        (async () => {
            getListHoc()
        })();
    }, []);

    const getListHoc = async () => {
        const response = await getCompanyList();
        if (response.code === '200') {
            setCompanyList(response.data);
        }
    }

    const modifyCompany = (value) => {
        setModalTitle('修改');
        setModalVisible(true);
        setCompanyDetail(value);
    }

    const deleteCompany = async ({ id }) => {
        const res = await deleteCompanyServer({ id })
        if (res.code === '200') {
            message.success('成功');
            getListHoc()
        } else {
            message.error(res.msg);
        }
    }

    const addCompany = () => {
        setCompanyDetail({});
        setModalVisible(true);
        setModalTitle('新增');
    }

    const handleOk = async () => {
        const { id, companyName, pid } = companyDetail;
        let res = null;

        if (!companyName || !pid) {
            message.error('配置项不正确'); 
            return;
        }

        if (ModalTitle === '新增') {
            res = await addCompanyDetail({ company: companyName, pid })
        } else if (ModalTitle === '修改') {
            res = await updateCompanyDetail({ id, company: companyName, pid })
        }

        if (res.code === '200') {
            message.success('成功');
            setModalVisible(false);
            getListHoc()
        } else {
            message.error(res.msg);
        }
    }


    const columns = [
        {
            title: '公司名称',
            dataIndex: 'companyName',
            key: 'companyName',
            align: 'center',
        },
        {
            title: '父公司名称',
            dataIndex: 'parentName',
            key: 'parentName',
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
            title: '操作',
            dataIndex: 'tags',
            key: 'tags',
            align: 'center',
            render: (text, record) => (
                <>
                    <a onClick={() => modifyCompany(record)}>
                        修改
                    </a>
                    <Popconfirm
                        title="确定删除?"
                        onConfirm={() => deleteCompany(record)}
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
                companyDetail={companyDetail}
                handleOk={handleOk}
                handleCancel={() => setModalVisible(false)}
                setCompanyDetail={setCompanyDetail}
                companyList={companyList}
            />
            <Card>
                <Button type="primary" style={{ marginBottom: 20 }} onClick={addCompany}>
                    新建公司
                </Button>
                <Table columns={columns} dataSource={companyList} rowKey={(r) => r.id} />
            </Card>
        </PageContainer>
    );
};

export default Company;
