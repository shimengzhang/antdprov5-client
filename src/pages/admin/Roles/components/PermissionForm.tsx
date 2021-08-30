import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Modal, Spin } from 'antd';
import type { TableListItem } from '../data';
// import { queryRoles } from '../service';
import { queryPermissions } from '../../Permissions/service';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: TableListItem) => void;
  onSubmit: (values: TableListItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

const PermissionForm: React.FC<UpdateFormProps> = (props) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const {
    updateModalVisible,
    values: { _id, permissions = [] },
  } = props;

  useEffect(() => {
    async function getRoles() {
      setLoading(true);
      const { success, data } = await queryPermissions();
      if (success) {
        setOptions(data.map((per) => ({ label: per.nameCn, value: per._id })));
        setLoading(false);
      }
    }
    if (updateModalVisible) {
      getRoles();
    }
  }, [updateModalVisible]);

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    props.onSubmit(values);
  };

  const renderContent = () => {
    return (
      <Form
        initialValues={{ permissionIds: permissions.map((r) => r._id), _id }}
        onFinish={onFinish}
      >
        <Form.Item name="permissionIds">
          <Checkbox.Group options={options} onChange={onChange} />
        </Form.Item>
        <Form.Item name="_id" hidden={true}>
          <input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={'分配权限'}
      visible={updateModalVisible}
      maskClosable={false}
      footer={false}
      onCancel={() => {
        props.onCancel();
      }}
    >
      {/* ProForm 不适合做 checkbox，需要自己写表单 */}
      {loading ? <Spin /> : renderContent()}
    </Modal>
  );
};

export default PermissionForm;
