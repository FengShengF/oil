import React from 'react';
import Modal from '@/components/Modal';
import { Row, Col, Input, Radio, Select, InputNumber } from 'antd';
const { Option } = Select;

const UserModal = (props) => {
    const { userDetail, setUserDetail } = props;
    const { userName, password, name, age,sex,type,phone,isLeader } = userDetail;
    // const isTop = (value) => {
    //     if (value === 1) {
    //         setUserDetail({ ...userDetail, pid: -1 })
    //     } else {
    //         setUserDetail({ ...userDetail, pid: companyList[0].id })
    //     }
    // }

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
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>密码:</span>
                </Col>
                <Col span={12}>
                    <Input
                        onChange={(e) => setUserDetail({ ...userDetail, password: e.target.value })}
                        value={password}
                    />
                </Col>
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
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                    </Radio.Group>
                </Col>
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
                        <Radio value={0}>admin</Radio>
                        <Radio value={1}>管理人员</Radio>
                        <Radio value={1}>操作员</Radio>
                    </Radio.Group>
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>电话:</span>
                </Col>
                <Col span={12}>
                    <InputNumber
                        onChange={(e) => setUserDetail({ ...userDetail, phone: e })}
                        value={phone}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>是否是公司老大:</span>
                </Col>
                <Col span={12}>
                    <Radio.Group
                        onChange={(e) => setUserDetail({ ...userDetail, isLeader: e.target.value })}
                        value={isLeader}
                    >
                        <Radio value={0}>否</Radio>
                        <Radio value={1}>是</Radio>
                    </Radio.Group>
                </Col>
            </Row>
        </>
    );
};

export default Modal(UserModal);
