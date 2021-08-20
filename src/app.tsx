import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import type { RequestOptionsInit } from 'umi-request';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      localStorage.removeItem('token');
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

/**
 * 异常处理程序
 * @param error
 */
const errorHandler = (error: any) => {
  // const { messages } = getIntl(getLocale());
  const { response } = error; // 拦截器返回 data 后，error 里只有 data，没有 response
  // console.log('errorHandler');
  // console.dir(error);

  if (response && response.status !== 200 && response.status !== 422) {
    const { status, url } = response;
    if (status === 401) {
      notification.error({
        description: '认证超时，请重新登录',
        message: '认证超时',
      });
      history.push('/user/login');
    } else {
      notification.error({
        description: `请求错误 ${status}:${url}`,
        message: '网络异常',
      });
    }
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器 123',
      message: '网络异常',
    });
  }

  throw error;
};

const DOMAIN =
  process.env.NODE_ENV === 'production' ? 'http://localhost:6060' : 'http://localhost:6060';

const demoResponseInterceptors = async (response: Response, options: RequestOptionsInit) => {
  // response.headers.append('interceptors', 'yes yo');
  // const data = await response.clone().json();
  // console.log('data', data);
  // return data;
  return response;
};

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

export const request: RequestConfig = {
  errorHandler, // 在拦截器之后执行
  prefix: `${DOMAIN}/api`,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`,
  // },
  // credentials: 'include',
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [demoResponseInterceptors],
};
