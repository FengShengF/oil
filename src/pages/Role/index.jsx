import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Popconfirm, message, Button } from 'antd';
import { getRoleList, deleteRoleServer, updateRoleDetail, addRoleDetail, getMenuList, addRoleMenu, deleteRoleMenu } from './service';
import { getCompanyList } from '../company/service';
import Modal from './Modal.jsx';
import MenuModal from './MenuModal.jsx';

const Role = () => {
    const [roleList, setRoleList] = useState('');
    const [companyList, setCompanyList] = useState('');
    const [ModalTitle, setModalTitle] = useState('');
    const [ModalVisible, setModalVisible] = useState(false);
    const [roleDetail, setRoleDetail] = useState({});

    const [menuList, setMenuList] = useState([]);
    const [MenuModalTitle, setMenuModalTitle] = useState('');
    const [MenuModalVisible, setMenuModalVisible] = useState(false);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [menuChangeId, setMenuChangeId] = useState('');

    useEffect(() => {
        (async () => {
            getRoleListHoc();
            getCompanyListHoc();
        })();
    }, []);

    //获取公司列表接口
    const getCompanyListHoc = async () => {
        const response = await getCompanyList();
        if (response.code === '200') {
            setCompanyList(response.data);
        }
    }
    //增加角色按钮
    const addRole = () => {
        setRoleDetail({ type: '0' });
        setModalVisible(true);
        setModalTitle('新增角色');
    }
    //确认删除角色
    const deleteRole = async ({ id }) => {
        const res = await deleteRoleServer({ id })
        if (res.code === '200') {
            message.success('成功');
            getRoleListHoc()
        } else {
            message.error(res.msg);
        }
    }
    //修改角色按钮
    const modifyRole = (value) => {
        setModalTitle('修改角色');
        setModalVisible(true);
        setRoleDetail(value);
    }
    //获取角色列表接口
    const getRoleListHoc = async () => {
        const response = await getRoleList();
        if (response.code === '200') {
            setRoleList(response.data);
        }
    }
    //确认修改角色按钮
    const roleHandleOk = async () => {
        const { id, name, type, companyId } = roleDetail;
        let res = null;

        if (!name || !companyId || !type) {
            message.error('配置项不正确');
            return;
        }

        if (ModalTitle === '新增角色') {
            res = await addRoleDetail(roleDetail)
        } else if (ModalTitle === '修改角色') {
            res = await updateRoleDetail(roleDetail)
        }

        if (res.code === '200') {
            message.success('成功');
            setModalVisible(false);
            getRoleListHoc();
        } else {
            message.error(res.msg);
        }
    }


    //角色-菜单相关
    //处理角色数据为树状数据结构
    const setMenuData = (data) => {
        let menuData = [];
        //一级菜单
        data.map(item => {
            if (item.parentId == -1) {
                menuData[item.orderNum] = item;
                menuData[item.orderNum].children = [];
            }
        })
        //二级菜单
        data.map(item => {
            if (item.parentId != -1) {
                menuData.map(item1 => {
                    if (item1.id === item.parentId) {
                        item1.children[item.orderNum] = item;
                    }
                })
            }
        })
        return menuData;
    }
    //遍历找出角色对应的菜单的key
    const getDefaultKeys = (data) => {
        let newKeys = [].concat(checkedKeys);
        data.map(item => {
            if (!item.children) {
                if (item.selected) {
                    newKeys.push(item.id)
                    setCheckedKeys(newKeys)
                }
            } else {
                getDefaultKeys(item.children)
            }
        })
    };
    //获取角色对应的菜单
    const modifyMenu = async ({ id }) => {
        setCheckedKeys([])
        setMenuChangeId(id)
        const res = await getMenuList({ id });
        if (res.code === '200') {
            const menuData = setMenuData(res.data);
            getDefaultKeys(menuData)
            setMenuList(menuData)
        } else {
            message.error(res.msg);
        }
        setMenuModalTitle('修改菜单');
        setMenuModalVisible(true);
    }
    //确认修改菜单
    const menuHandleOk = async () => {
        let news = [];

        checkedKeys.map(item => {
            news.push({
                roleId: menuChangeId,
                menuId: item
            })
        })

        const res = await addRoleMenu(news);

        if (res.code === '200') {
            message.success('成功');
            setMenuModalVisible(false);
        } else {
            message.error(res.msg);
        }
    }
    //取消角色菜单授权
    const deleteMenu = async ({ id }) => {
        setCheckedKeys([])
        const res = await getMenuList({ id });

        if (res.code === '200') {
            let newsData = [];
            res.data.map(item => {
                item.selected ? newsData.push({
                    roleId: id,
                    menuId: item.id
                }) : null;
            })

            const res1 = await deleteRoleMenu(newsData);
            if (res1.code === '200') {
                message.success('成功');
            } else {
                message.error(res1.msg);
            }
        } else {
            message.error(res.msg);
        }
    }

    const columns = [
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
                        修改角色
                    </a>
                    <Popconfirm
                        title="确定删除?"
                        onConfirm={() => deleteRole(record)}
                    >
                        <a style={{ marginLeft: 20, color: "red" }}>删除角色</a>
                    </Popconfirm>
                    <br />
                    <a onClick={() => modifyMenu(record)}>
                        修改菜单
                    </a>
                    <Popconfirm
                        title="确定取消菜单?"
                        onConfirm={() => deleteMenu(record)}
                    >
                        <a style={{ marginLeft: 20, color: "red" }}>取消菜单</a>
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
                handleOk={roleHandleOk}
                handleCancel={() => setModalVisible(false)}
                setRoleDetail={setRoleDetail}
                roleList={roleList}
                companyList={companyList}
            />
            <MenuModal
                title={MenuModalTitle}
                visible={MenuModalVisible}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                menuList={menuList}
                handleOk={menuHandleOk}
                handleCancel={() => setMenuModalVisible(false)}
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
