import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { FormattedMessage, useAccess } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from '@/pages/admin/Users/components/UpdateForm';
import UpdateForm from '@/pages/admin/Users/components/UpdateForm';
import { queryUsers, addUser, updateUser, removeRule } from '@/services/ant-design-pro/api';
import moment from 'moment';
import { Form, Input } from 'antd';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UsersListItem) => {
  const hide = message.loading('正在添加');
  console.log(`fields`, fields);
  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败，请重试!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  console.log(`fields`, fields);
  const hide = message.loading('正在更新');
  try {
    await updateUser({
      ...fields,
    });
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，请重试!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.UsersListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row._id),
    });
    hide();
    message.success('删除成功，会很快刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UsersListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.UsersListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  // const intl = useIntl();

  const columns: ProColumns<API.UsersListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      tip: '用户名是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '是否是超级管理员',
      dataIndex: 'isAdmin',
      renderText: (val) => (val ? '是' : '否'),
      initialValue: 'all',
      filters: true,
      valueEnum: {
        all: { text: '全部' },
        true: { text: '是' },
        false: { text: '否' },
      },
    },

    {
      title: '更新时间',
      sorter: false,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInTable: true,
      hideInSearch: true,
      // renderText: (val) => moment(val).fromNow(),
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createdAt',
      // valueType: 'dateTime',
      renderText: (val) => moment(val).fromNow(),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
      ],
    },
  ];

  const access = useAccess();

  return (
    <PageContainer>
      <ProTable<API.UsersListItem, API.PageParams>
        headerTitle="员工列表"
        actionRef={actionRef}
        rowKey="_id"
        search={{
          labelWidth: 120,
        }}
        // search={false}
        pagination={{ defaultPageSize: 2 }}
        // pagination={false}
        toolBarRender={() => [
          access.canCreate && (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
            </Button>
          ),
        ]}
        request={queryUsers}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={'新建员工'}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.UsersListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <Form.Item
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
        {/* <ProFormText
          rules={[
            {
              required: true,
              message: '用户名',
            },
          ]}
          label="用户名"
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '密码',
            },
          ]}
          label="密码"
          width="md"
          name="password"
        /> */}
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          // console.log('value', value);

          const success = await handleUpdate({ ...value });
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.UsersListItem>
            column={2}
            title={`${currentRow?.username}的详情`}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?._id,
            }}
            columns={columns as ProDescriptionsItemProps<API.UsersListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
