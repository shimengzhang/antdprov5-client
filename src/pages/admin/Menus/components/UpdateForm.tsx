import React, { useEffect, useState } from 'react';
import { Modal, Form, Select } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { TableListItem } from '../data';
import { request } from 'umi';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: TableListItem) => void;
  onSubmit: (values: TableListItem) => Promise<void>;
  updateModalVisible: boolean;
  values: TableListItem;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible } = props;
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    async function getMenus() {
      if (updateModalVisible) {
        const response = await request('/admin/menus/selectMenus');
        if (response.success) {
          setMenus(response.data);
        }
      }
    }
    getMenus();
  }, [updateModalVisible]);
  console.log(`props`, props);
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={'修改菜单'}
      visible={updateModalVisible}
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
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称!' }]}
        />
        <ProFormText
          label="描述"
          name="nameCn"
          rules={[{ required: true, message: '请输入描述!' }]}
        />
        <ProFormText
          label="权限"
          name="permission"
          rules={[{ required: true, message: '请输入权限!' }]}
        />
        <ProFormText
          label="路径"
          name="path"
          rules={[{ required: true, message: '请输入路径!' }]}
        />
        <Form.Item label="父类" name="parentId">
          <Select allowClear placeholder="请选择父类菜单">
            {menus.map(({ _id, name }) => (
              <Select.Option key={_id} value={_id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <ProFormText label="false" hidden={true} name="_id" />
        {/* <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="false" hidden={true} name="id">
          <Input />
        </Form.Item> */}
      </ProForm>
    </Modal>
    // <StepsForm
    //   stepsProps={{
    //     size: 'small',
    //   }}
    //   stepsFormRender={(dom, submitter) => {
    //     return (
    //       <Modal
    //         width={640}
    //         bodyStyle={{ padding: '32px 40px 48px' }}
    //         destroyOnClose
    //         title={'修改员工'}
    //         visible={props.updateModalVisible}
    //         footer={submitter}
    //         onCancel={() => {
    //           props.onCancel();
    //         }}
    //       >
    //         {dom}
    //       </Modal>
    //     );
    //   }}
    //   onFinish={props.onSubmit}
    // >
    //   <StepsForm.StepForm
    //     initialValues={{
    //       username: props.values.username,
    //       password: props.values.password,
    //       id: props.values._id,
    //     }}
    //     title={intl.formatMessage({
    //       id: 'pages.searchTable.updateForm.basicConfig',
    //       defaultMessage: '基本信息',
    //     })}
    //   >
    //     <Form.Item
    //       label="用户名"
    //       name="username"
    //       rules={[{ required: true, message: '请输入用户名!' }]}
    //     >
    //       <Input />
    //     </Form.Item>

    //     <Form.Item
    //       label="密码"
    //       name="password"
    //       rules={[{ required: true, message: '请输入密码!' }]}
    //     >
    //       <Input.Password />
    //     </Form.Item>
    //     <Form.Item label="false" hidden={true} name="id">
    //       <Input />
    //     </Form.Item>
    //   </StepsForm.StepForm>
    // </StepsForm>
  );
};

export default UpdateForm;
