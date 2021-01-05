import React from 'react';
import Modal from '@/components/Modal';
import { Row, Col, Input, Radio, Select, InputNumber } from 'antd';
const { Option } = Select;

const UserModal = (props) => {
    const { userDetail, setUserDetail, companyList, teamList, title } = props;
    const { userName, password, name, age, sex, type, phone, isLeader, companyId, teamId } = userDetail;

    return (
        <>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>账号:</span>
                </Col>
                <Col span={12}>
                    <Input
                        onChange={(e) => setUserDetail({ ...userDetail, userName: e.target.value })}
                        value={userName}
                    />
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>密码:</span>
                </Col>
                <Col span={12}>
                    <Input.Password
                        onChange={(e) => setUserDetail({ ...userDetail, password: e.target.value })}
                        value={password}
                    />
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>姓名:</span>
                </Col>
                <Col span={12}>
                    <Input
                        onChange={(e) => setUserDetail({ ...userDetail, name: e.target.value })}
                        value={name}
                    />
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>公司:</span>
                </Col>
                <Col span={12}>
                    <Select disabled={title === '修改'} defaultValue={companyId} style={{ width: 200 }} onChange={(e) => setUserDetail({ ...userDetail, companyId: e })}>
                        {companyList && companyList.map(item => (
                            <Option key={item.id} value={item.id}>{item.companyName}</Option>
                        ))}
                    </Select>
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>团队:</span>
                </Col>
                <Col span={12}>
                    <Select defaultValue={teamId} style={{ width: 200 }} onChange={(e) => setUserDetail({ ...userDetail, teamId: e })}>
                        {teamList && teamList.map(item => (
                            <Option key={item.id} value={item.id}>{item.teamName}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>年龄:</span>
                </Col>
                <Col span={12}>
                    <InputNumber
                        onChange={(e) => setUserDetail({ ...userDetail, age: e })}
                        value={age}
                    />
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>性别:</span>
                </Col>
                <Col span={12}>
                    <Radio.Group
                        onChange={(e) => setUserDetail({ ...userDetail, sex: e.target.value })}
                        value={sex}
                    >
                        <Radio value={'男'}>男</Radio>
                        <Radio value={'女'}>女</Radio>
                    </Radio.Group>
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>用户类型:</span>
                </Col>
                <Col span={12}>
                    <Radio.Group
                        onChange={(e) => setUserDetail({ ...userDetail, type: e.target.value })}
                        value={type}
                    >
                        <Radio value={'0'}>admin</Radio>
                        <Radio value={'1'}>管理人员</Radio>
                        <Radio value={'2'}>操作员</Radio>
                    </Radio.Group>
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>电话:</span>
                </Col>
                <Col span={12}>
                    <InputNumber
                        style={{ width: '100%' }}
                        onChange={(e) => setUserDetail({ ...userDetail, phone: e })}
                        value={phone}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>公司老大:</span>
                </Col>
                <Col span={12}>
                    <Radio.Group
                        onChange={(e) => setUserDetail({ ...userDetail, isLeader: e.target.value })}
                        value={isLeader}
                    >
                        <Radio value={'0'}>否</Radio>
                        <Radio value={'1'}>是</Radio>
                    </Radio.Group>
                </Col>
                <Col push={1} span={2}><span style={{ color: 'red' }}>*</span></Col>
            </Row>
        </>
    );
};

export default Modal(UserModal);
