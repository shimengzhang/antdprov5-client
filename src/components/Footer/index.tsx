// import { useIntl } from 'umi';
// import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  // const intl = useIntl();
  const defaultMessage = '汽车之家前端团队出品';

  const currentYear = new Date().getFullYear();

  return <DefaultFooter copyright={`${currentYear} ${defaultMessage}`} links={null} />;
};
