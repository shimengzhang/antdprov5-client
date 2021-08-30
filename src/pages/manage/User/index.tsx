import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Avatar, Button, Switch, message, Radio } from 'antd';
import { useState, useRef } from 'react';
import { getUserList, updateUserLock } from '@/services/ant-design-pro/user';
import Create from './components/Create';
import Update from './components/Update';

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [row, setRow] = useState({});
  const tableRef = useRef(null);

  const showForm = (show) => {
    setIsModalVisible(show);
  };
  const showEditForm = (show, record) => {
    setIsEditModalVisible(show);
    setRow(record);
  };
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => <Avatar src={record.avatar_url} size={32} icon={<UserOutlined />} />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          defaultChecked={record.is_locked === 0}
          onChange={async () => {
            const res = await updateUserLock(record.id);
            if (res.success) {
              message.info('操作成功');
            }
          }}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => (
        <a
          onClick={() => {
            showEditForm(true, record);
          }}
        >
          编辑
        </a>
      ),
    },
  ];

  console.log(`styles`, styles);
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        request={async (params = {}, sort, filter) => {
          console.log(params, sort, filter);

          return getUserList(params);
        }}
        actionRef={tableRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 2,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            onClick={() => showForm(true)}
            icon={<PlusOutlined />}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <Create showForm={showForm} isModalVisible={isModalVisible} tableRef={tableRef} />
      <Update
        showEditForm={showEditForm}
        isEditModalVisible={isEditModalVisible}
        tableRef={tableRef}
        row={row}
      />
    </PageContainer>
  );
}
