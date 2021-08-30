import React from 'react';
import { Modal } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
// import { useIntl } from 'umi';
// import { Form, Input } from 'antd';

export type FormValueType = {
  nameCn?: string;
  name?: string;
  _id?: string;
} & Partial<API.UsersListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: FormValueType;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  // const intl = useIntl();
  console.log(`props`, props);
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={'修改权限'}
      visible={props.updateModalVisible}
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
          label="标识符"
          name="nameCn"
          rules={[{ required: true, message: '请输入标识符!' }]}
        />
        <ProFormText
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称!' }]}
        />
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
