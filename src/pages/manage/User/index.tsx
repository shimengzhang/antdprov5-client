import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Avatar, Button, Switch, message, Radio } from 'antd';
import { useState, useRef } from 'react';
import { getUserList, updateUserLock } from '@/services/ant-design-pro/user';
import Create from './components/Create';
import Update from './components/Update';
import styles from './index.less';

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [row, setRow] = useState({});
  const tableRef = useRef(null);

  const [theme, setTheme] = useState(0);
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

  const handleThemeChange = (e) => {
    const val = +e.target.value;
    setTheme(val);
    let styleLink: any = document.getElementById('theme-style');
    const body = document.getElementsByTagName('body')[0];
    if (styleLink) {
      // 假如存在id为theme-style 的link标签，直接修改其href
      if (val === 1) {
        styleLink.href = '/theme/theme1.css'; // 切换 ant design 组件主题
        body.className = 'body-wrap-theme1'; // 切换自定义组件的主题
      } else if (val === 2) {
        styleLink.href = '/theme/theme2.css';
        body.className = 'body-wrap-theme2';
      } else {
        styleLink.href = '';
        body.className = '';
      }
    } else {
      // 不存在的话，则新建一个
      styleLink = document.createElement('link');
      styleLink.type = 'text/css';
      styleLink.rel = 'stylesheet';
      styleLink.id = 'theme-style';
      if (val === 1) {
        styleLink.href = '/theme/theme1.css';
        body.className = 'body-wrap-theme1';
      } else if (val === 2) {
        styleLink.href = '/theme/theme2.css';
        body.className = 'body-wrap-theme2';
      } else {
        styleLink.href = '';
        body.className = '';
      }
      document.body.append(styleLink);
    }
  };
  console.log(`styles`, styles);
  return (
    <PageContainer>
      <Radio.Group value={theme} onChange={handleThemeChange}>
        <Radio.Button value="0">Default</Radio.Button>
        <Radio.Button value="1">theme1</Radio.Button>
        <Radio.Button value="2">theme2</Radio.Button>
      </Radio.Group>
      <br />
      <div className={styles['common-button']}>测试自定义主题</div>
      <br />
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
