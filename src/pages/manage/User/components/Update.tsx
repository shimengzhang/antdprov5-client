// @ts-nocheck
import { updateShopUser } from '@/services/ant-design-pro/user';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Modal } from 'antd';

export default function Update({ showEditForm, isEditModalVisible, tableRef, row = {} }) {
  const handleSubmit = async (vals) => {
    console.log(`vals`, vals);
    const data = await updateShopUser(row.id, vals);
    if (data.success) {
      // 刷新表格
      tableRef.current.reloadAndRest();
      message.success('添加成功');
    }
    showEditForm(false);
  };
  return (
    <Modal
      title="编辑用户"
      destroyOnClose
      visible={isEditModalVisible}
      onCancel={() => showEditForm(false)}
      footer={false}
    >
      <ProForm
        initialValues={{ name: row.name, password: '12345678', email: row.email }}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
        <ProFormText
          name="name"
          label="姓名"
          placeholder={'请输入昵称'}
          rules={[{ required: true, message: '姓名不能为空' }]}
        />

        <ProFormText.Password
          name="password"
          label="密码"
          placeholder={'请输入密码'}
          rules={[
            { required: true, message: '密码不能为空' },
            { min: 6, message: '密码不能少于 6 位' },
          ]}
        />
        <ProFormText
          name="email"
          label="邮箱"
          placeholder={'请输入邮箱'}
          rules={[
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        />
      </ProForm>
    </Modal>
  );
}
