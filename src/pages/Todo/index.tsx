// import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Alert, Button, Modal } from 'antd';
import { useState } from 'react';
// import { getTodoList } from '@/services/ant-design-pro/todo';
import { useModel } from 'umi';

// status 0 待办 1 完成 2 取消
// const data = [
//   { id: 1, title: '待办 1', status: 0 },
//   { id: 2, title: '待办 2', status: 1 },
//   { id: 3, title: '待办 3', status: 2 },
//   { id: 4, title: '待办 4', status: 0 },
//   { id: 5, title: '待办 5', status: 0 },
//   { id: 6, title: '待办 6', status: 1 },
//   { id: 7, title: '待办 7', status: 2 },
//   { id: 8, title: '待办 8', status: 0 },
// ];

const statusInfo = [
  <Alert key={1} message="待办" type="info" showIcon />,
  <Alert key={1} message="已成功" type="success" showIcon />,
  <Alert key={1} message="已取消" type="error" showIcon />,
];

export default function Todo() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // @ts-ignore
  const { data, addData, updateData } = useModel('todo');
  const changeStatus = (id, status) => {
    updateData({
      id,
      status,
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        return [statusInfo[record.status]];
      },
    },
    {
      title: '修改状态',
      render: (_, { id, status }) => {
        return [
          <a key={1} onClick={() => changeStatus(id, 0)}>
            待办{' '}
          </a>,
          <a key={2} onClick={() => changeStatus(id, 1)}>
            完成{' '}
          </a>,
          <a key={3} onClick={() => changeStatus(id, 2)}>
            取消{' '}
          </a>,
        ].filter((a, index) => status !== index);
      },
    },
  ];

  console.log(`data`, data);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showForm = () => {
    setIsModalVisible(true);
  };

  // const [form] = Form.useForm();
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };

  // const onReset = () => {
  //   form.resetFields();
  // };

  const handleSubmit = (vals) => {
    console.log('vals', vals);
    addData(vals);
    setIsModalVisible(false);
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={data}
        // request={async (params, sorter, filter) => {
        //   // 表单搜索项会从 params 传入，传递给后端接口。
        //   console.log(params, sorter, filter);
        //   const data = await getTodoList();
        //   return {
        //     data,
        //     success: true,
        //   };
        // }}
        rowKey="id"
        // pagination={{
        //   showQuickJumper: true,
        // }}
        search={false}
        dateFormatter="string"
        headerTitle="待办事项列表"
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showForm}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
      <Modal
        title="新建待办事项"
        destroyOnClose
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <ProForm
          initialValues={{ title: '123' }}
          onFinish={async (values) => {
            handleSubmit(values);
          }}
        >
          <ProFormText name="title" label="待办" rules={[{ required: true }]} />
        </ProForm>
        {/* <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="note" label="待办" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form> */}
      </Modal>
    </PageContainer>
  );
}
