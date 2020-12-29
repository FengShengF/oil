import React from 'react';
import Modal from '@/components/Modal';
import { Row, Col, Input, Radio, Select } from 'antd';
const { Option } = Select;

const CompanyModal = (props) => {
    const { companyDetail, setCompanyDetail, companyList } = props;
    const { companyName, pid } = companyDetail;
    const isTop = (value) => {
        if (value === 1) {
            setCompanyDetail({ ...companyDetail, pid: -1 })
        } else {
            setCompanyDetail({ ...companyDetail, pid: companyList[0].id })
        }
    }

    return (
        <>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>公司名称:</span>
                </Col>
                <Col span={12}>
                    <Input
                        onChange={(e) => setCompanyDetail({ ...companyDetail, companyName: e.target.value })}
                        value={companyName}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>最顶级公司:</span>
                </Col>
                <Col span={12}>
                    <Radio.Group
                        onChange={(e) => isTop(e.target.value)}
                        value={pid == -1 ? 1 : 0}
                    >
                        <Radio value={0}>否</Radio>
                        <Radio value={1}>是</Radio>
                    </Radio.Group>
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4} push={4}>
                    <span>顶级公司:</span>
                </Col>
                <Col span={12} push={4}>
                    <Select value={pid == -1 ? '' : pid} disabled={pid == -1} style={{ width: 150 }} onChange={(e) => setCompanyDetail({ ...companyDetail, pid: e })}>
                        {
                            companyList.map(item => (
                                <Option key={item.id} value={item.id}>{item.companyName}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
        </>
    );
};

export default Modal(CompanyModal);
