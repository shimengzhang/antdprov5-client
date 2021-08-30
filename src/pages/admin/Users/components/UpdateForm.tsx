import React from 'react';
import { Modal } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { TableListItem } from '../data';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: TableListItem) => void;
  onSubmit: (values: TableListItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={'修改员工'}
      visible={props.updateModalVisible}
      maskClosable={false}
      footer={false}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm
        initialValues={{
          ...props.values,
        }}
        onFinish={async (values) => {
          props.onSubmit(values);
        }}
      >
        <ProFormText
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        />
        <ProFormText.Password
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        />
        <ProFormText label="false" hidden={true} name="_id" />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
