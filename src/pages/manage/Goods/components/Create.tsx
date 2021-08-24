import { getCategory } from '@/services/ant-design-pro/category';
import { addShopUser } from '@/services/ant-design-pro/user';
import ProForm, {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { useState, useEffect } from 'react';
import { message, Modal, Cascader } from 'antd';
import Editor from '@/components/Editor';

export default function Create({ showForm, isModalVisible, tableRef }) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchCategory() {
      const data = await getCategory();
      if (data.success) {
        setCategory(data.data);
      }
    }
    fetchCategory();
  }, []);
  const handleSubmit = async (vals) => {
    console.log(`vals`, vals);
    const data = await addShopUser(vals);
    if (data.success) {
      // 刷新表格
      tableRef.current.reloadAndRest();
      message.success('添加成功');
    }
    showForm(false);
  };
  return (
    <Modal
      title="创建用户"
      destroyOnClose
      visible={isModalVisible}
      onCancel={() => showForm(false)}
      footer={false}
    >
      <ProForm
        initialValues={{}}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
        <ProForm.Item
          name="category_id"
          label="分类"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Cascader
            options={category}
            fieldNames={{ label: 'name', value: 'id' }}
            placeholder="请选择分类"
          />
        </ProForm.Item>

        {/* <ProFormText
          name="category_id"
          label="分类"
          placeholder={'请输入分类'}
          rules={[{ required: true, message: '分类不能为空' }]}
        /> */}
        <ProFormText
          name="title"
          label="商品名称"
          placeholder={'请输入商品名称'}
          rules={[{ required: true, message: '商品名称不能为空' }]}
        />
        <ProFormTextArea
          name="description"
          label="描述"
          placeholder={'请输入描述'}
          rules={[{ required: true, message: '描述不能为空' }]}
        />
        <ProFormDigit
          name="price"
          label="价格"
          min={0}
          max={99999999}
          placeholder={'请输入价格'}
          rules={[{ required: true, message: '价格不能为空' }]}
        />
        <ProFormDigit
          name="stock"
          label="库存"
          min={0}
          max={99999999}
          placeholder={'请输入库存'}
          rules={[{ required: true, message: '库存不能为空' }]}
        />
        <ProFormUploadButton
          label="上传"
          name="cover"
          action="upload.do"
          rules={[{ required: true, message: '请选择商品主图' }]}
        />
        <ProForm.Item
          name="details"
          label="详情"
          rules={[{ required: true, message: '详情不能为空' }]}
        >
          <Editor />
        </ProForm.Item>
      </ProForm>
    </Modal>
  );
}
