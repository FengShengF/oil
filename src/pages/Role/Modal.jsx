import React from 'react';
import Modal from '@/components/Modal';
import { Row, Col, Input, Select, Radio } from 'antd';

const { Option } = Select;

const RoleModal = (props) => {
    const { title, roleDetail, setRoleDetail, companyList } = props;
    const { name, companyId, type } = roleDetail;

    return (
        <>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>角色名称:</span>
                </Col>
                <Col span={12}>
                    <Input
                        onChange={(e) => setRoleDetail({ ...roleDetail, name: e.target.value })}
                        value={name}
                    />
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>公司名称:</span>
                </Col>
                <Col span={12}>
                    <Select disabled={title === '修改角色'} value={companyId} style={{ width: 150 }} onChange={(e) => setRoleDetail({ ...roleDetail, companyId: e })}>
                        {
                            companyList.map(item => (
                                <Option key={item.id} value={item.id}>{item.companyName}</Option>
                            ))
                        }
                    </Select>
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>角色类型:</span>
                </Col>
                <Col span={12}>
                    <Radio.Group
                        onChange={(e) => setRoleDetail({ ...roleDetail, type: e.target.value })}
                        value={type}
                    >
                        <Radio value={'0'}>操作员</Radio>
                        <Radio value={'1'}>管理员</Radio>
                    </Radio.Group>
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>

        </>
    );
};

export default Modal(RoleModal);
