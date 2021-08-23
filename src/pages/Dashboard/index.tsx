import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchDashboard } from '@/services/ant-design-pro/dashboard';

export default function Index() {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    async function fetchData() {
      const res = await fetchDashboard();
      // console.log(res);

      setData(res);
    }
    fetchData();
  }, []);
  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数"
              value={data.users_count}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数"
              value={data.goods_count}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数"
              value={data.order_count}
              precision={0}
              valueStyle={{ color: '#adc322' }}
              prefix={<ArrowDownOutlined />}
              // suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
