import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { message } from 'antd';
import type { RequestOptionsInit } from 'umi-request';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  304: '已经执行了GET，但文件未变化',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  402: '参数失败',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时',
};

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
const errorHandler = async (error: any) => {
  // const { messages } = getIntl(getLocale());
  const { response } = error; // 拦截器返回 data 后，error 里只有 data，没有 response
  // console.log('errorHandler', response);
  // console.dir(error);
  if (response && response.status) {
    let errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    // response 的实际返回结果需要这样查看：
    console.log(`response`, response);
    // antd pro 的 request 使用的 fetch，其接收到的 response 是一个Stream 对象，
    // response.json() 是一个异步操作，取出所有内容，并将其转为JSON 对象
    const res = await response.json();

    // 处理 422 验证未通过
    if (status === 422) {
      errorText += `[ ${Object.keys(res.errors)
        .map((key) => res.errors[key])
        .join(',')} ]`;
    }
    // 处理 400 的情况
    if (status === 422) {
      errorText += `[ ${res.message} ]`;
    }

    if (status === 401) {
      message.error('认证超时，请重新登录');
      history.push('/user/login');
    }

    message.error(`请求错误 ${status}:${errorText}`);
  }

  if (!response) {
    message.error('您的网络发生异常，无法连接服务器 123');
  }

  throw error;
};

const DOMAIN =
  process.env.NODE_ENV === 'production' ? 'http://localhost:6060' : 'http://localhost:6060';

const demoResponseInterceptors = async (response: Response, _options: RequestOptionsInit) => {
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

/**
 * 请求 url 以 /api/shop/ 开头的，移除 prefix, 走 mock 数据
 * @param url
 * @param options
 * @returns
 */
const urlInterceptor = (url: string, options: RequestOptionsInit) => {
  const index = url.indexOf('/api/shop/');

  return {
    url: `${index > -1 ? url.slice(index) : url}`,
    options,
  };
};

export const request: RequestConfig = {
  errorHandler, // 在拦截器之后执行
  prefix: `${DOMAIN}/api`,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`,
  // },
  // credentials: 'include',
  requestInterceptors: [urlInterceptor, authHeaderInterceptor],
  responseInterceptors: [demoResponseInterceptors],
};
