import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Radio } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useState } from 'react';
import './index.less';
import { blue } from '@ant-design/colors';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('middle');
  const [value, setValue] = useState(1);
  console.log(blue);
  return (
    <div>
      <Card title="Loading 按钮">
        <Button type="primary" onClick={() => setLoading(!loading)}>
          Loading
        </Button>
        <Button type="primary" loading={loading} icon={<PlusOutlined />}>
          创建
        </Button>
        <Button type="primary" loading={loading} shape="circle" icon={<SearchOutlined />}></Button>
      </Card>
      <Card title="按钮组">
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <Button type="primary" size={size}>
          Primary
        </Button>
      </Card>
      <Card title="按钮组 2">
        <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
          <Radio.Button value={1}>{<ArrowLeftOutlined />} 后退</Radio.Button>
          <Radio.Button value={2}>
            前进 <ArrowRightOutlined />
          </Radio.Button>
        </Radio.Group>
      </Card>
      <Card title="block 按钮">
        <Button type="primary" size={size} block>
          Primary
        </Button>
      </Card>
    </div>
  );
};

export default Index;
