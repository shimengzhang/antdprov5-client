import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: false,
  splitMenus: true,
  colorWeak: false,
  title: '自助埋点系统',
  pwa: false,
  logo: 'https://m.autohome.com.cn/favicon.ico',
  iconfontUrl: '',
};

export default Settings;
