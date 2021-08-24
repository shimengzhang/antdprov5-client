// @ts-nocheck
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Avatar, Button, Switch, Image, message } from 'antd';
import { useState, useRef } from 'react';
import { getGoods, updateGoodsOn, updateGoodsRecommend } from '@/services/ant-design-pro/goods';
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
      title: '商品图',
      dataIndex: 'cover_url',
      hideInSearch: true,
      render: (_, record) => (
        <Image
          width={64}
          src={record.cover_url}
          placeholder={<Image preview={false} src={record.cover_url} width={200} />}
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      valueType: 'radioButton',
      valueEnum: {
        0: { text: '未上架' },
        1: { text: '已上架' },
      },
      render: (_, record) => (
        <Switch
          checkedChildren="已上架"
          unCheckedChildren="未上架"
          defaultChecked={record.is_on === 1}
          onChange={async () => {
            const res = await updateGoodsOn(record.id);
            if (res.success) {
              message.info('操作成功');
            }
          }}
        />
      ),
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      valueType: 'radioButton',
      valueEnum: {
        0: { text: '未推荐' },
        1: { text: '已推荐' },
      },
      render: (_, record) => (
        <Switch
          checkedChildren="已推荐"
          unCheckedChildren="未推荐"
          defaultChecked={record.is_recommend === 1}
          onChange={async () => {
            const res = await updateGoodsRecommend(record.id);
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

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        request={async (params = {}, sort, filter) => {
          console.log(params, sort, filter);
          return getGoods(params);
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
