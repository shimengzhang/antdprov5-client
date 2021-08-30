import React from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="新建菜单"
      width={420}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      maskClosable={false}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
