import React from 'react';
import Modal from '@/components/Modal';
import { Checkbox } from 'antd';
const { Group } = Checkbox;

const RoleModal = (props) => {
    const { option, optionKeys, setOptionKeys } = props;

    return (
        <>
            <Group options={option} defaultValue={optionKeys} onChange={value => setOptionKeys(value)} />
        </>
    );
};

export default Modal(RoleModal);
