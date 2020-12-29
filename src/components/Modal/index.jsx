import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';

export default (MyComponent) => {
  class Layer extends PureComponent {
    render() {
      const {
        title,
        visible,
        loading,
        handleCancel,
        handleOk,
        cancelText,
        okText,
        buttonNumber,
        width,
        cancelButtonProps,
        cancelIsClick,
      } = this.props;
      return (
        <div>
          <Modal
            maskClosable={false}
            destroyOnClose
            visible={visible}
            title={title}
            width={width || 600}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <div key={title} style={{ display: 'flex', justifyContent: 'center' }}>
                {buttonNumber === 1 ? null : (
                  <Button
                    key="back"
                    disabled={cancelIsClick ? cancelIsClick : false}
                    onClick={cancelButtonProps || handleCancel}
                  >
                    {cancelText || '取消'}
                  </Button>
                )}
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                  {okText || '确认'}
                </Button>
              </div>,
            ]}
          >
            <MyComponent {...this.props} />
          </Modal>
        </div>
      );
    }
  }
  return Layer;
};
