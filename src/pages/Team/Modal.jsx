import React from 'react';
import Modal from '@/components/Modal';
import { Row, Col, Input, Select } from 'antd';

const { Option } = Select;

const TeamModal = (props) => {
    const { teamDetail, setTeamDetail, companyList } = props;
    const { teamName, companyId, teamLeaderName } = teamDetail;

    return (
        <>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>团队名称:</span>
                </Col>
                <Col span={12}>
                    <Input
                        onChange={(e) => setTeamDetail({ ...teamDetail, teamName: e.target.value })}
                        value={teamName}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>公司名称:</span>
                </Col>
                <Col span={12}>
                    <Select value={companyId} style={{ width: 150 }} onChange={(e) => setTeamDetail({ ...teamDetail, companyId: e })}>
                        {
                            companyList.map(item => (
                                <Option key={item.id} value={item.id}>{item.companyName}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }} type="flex" align="middle">
                <Col span={4}>
                    <span>队长:</span>
                </Col>
                <Col span={12}>
                    <Input
                        onChange={(e) => setTeamDetail({ ...teamDetail, teamLeaderName: e.target.value, teamLeader: e.target.value })}
                        value={teamLeaderName}
                    />
                </Col>
            </Row>

        </>
    );
};

export default Modal(TeamModal);
