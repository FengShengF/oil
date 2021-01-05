import React from 'react';
import Modal from '@/components/Modal';
import { Tree } from 'antd';

const { TreeNode } = Tree

const MenuRoleModal = (props) => {
    const { menuList, checkedKeys, setCheckedKeys } = props;

    const renderTree = (data) => {
        return data.map(item => {
            if (!item.children) {
                return (
                    <TreeNode title={item.name} key={item.id}></TreeNode>
                )
            } else {
                return (
                    <TreeNode title={item.name} key={item.id}>
                        {renderTree(item.children)}
                    </TreeNode>
                )
            }
        })
    }

    const onCheck = (keys) => {
        setCheckedKeys(keys)
    }

    return (
        <Tree
            checkable
            onCheck={onCheck}
            defaultExpandAll//是否默认全部展开
            defaultCheckedKeys={checkedKeys}//默认选中的数据
        >
            {renderTree(menuList)}
        </Tree>
    );
};

export default Modal(MenuRoleModal);
