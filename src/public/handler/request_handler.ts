// 请求处理模块
import Url from 'url';
import request from 'request';
import { IResponse, IRequest } from 'src/types/globals';
const Eureka = require('eureka-js-client').Eureka;
const client_eureka = new Eureka();
import eurekaUtils from '../../../util/eureka-utils';
const configApi = require('../../config/config_api.json');
const configServerMap = require('../../config/config_server_map.json');
const BASE_URL_REG = /((https|http|ftp|rtsp|mms)?:\/\/)((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]?\d{0,4}/g;
client_eureka.start(function (error: Error) {
  console.log(error || 'complete');
});

/**
 * url统一处理中间件
 * @param {String} url
 */
function _urlHandle(url: string): string {
  // 网关服务需增加服务名
  const IPAndPort: string[] | null = url.match(BASE_URL_REG);
  if (!IPAndPort) {
    throw new Error(`未获取到网关IP端口`);
  }
  const prefix: string = IPAndPort[0];
  const suffix: string = url.slice(prefix.length);
  const suffixArr: string[] = suffix.split('?');
  const route: string = suffixArr[0];
  const keys: string[] = Object.keys(configServerMap);
  const key: string[] = keys.filter(key => route.includes(key));
  const serverName: string = configServerMap[key[0]];
  return `${prefix}/${serverName}${suffix}`;
}

/**
 * 获取基础URL
 */
export function getApiBaseUrl(): string {
  return (eurekaUtils.getServerRootUrl(client_eureka, configApi.serverName));
}

/**
 * 请求Promise封装
 * @param {Object} req 请求对象
 * @param {String} httpMethod 请求方式  例: POST
 * @param {String} url 路由 例: http://127.0.0.1:80/index
 * @param {Object} postBody 请求对象  例: {a: 1, b: 2}
 */
export function urlGenerator(baseUrl: string, path: string[], params: any = {}): string {
  let _path: string = path.join('/');
  let _params: any = params;
  for (let key in _params) {
    if (typeof _params[key] === 'undefined' || _params[key] === null || _params[key] === '') {
      delete _params[key];
    }
    if (Array.isArray(_params[key])) {
      let value: string = _params[key].join(',');
      if (typeof _params[key] !== 'undefined' && _params[key] !== null && _params[key] !== '') {
        _params[key] = value;
      }
    }
  }
  let _url: string = baseUrl;
  let options = {
    pathname: _path,
    query: _params
  };
  let suffix: string = Url.format(options);
  return _url + suffix;
}

/**
 * 请求Promise封装
 * @param {Object} req 请求对象
 * @param {String} httpMethod 请求方式  例: POST
 * @param {String} url 路由 例: http://127.0.0.1:80/index
 * @param {Object} postBody 请求对象  例: {a: 1, b: 2}
 */
export function requestPromise(req: IRequest, httpMethod: string, url: string, postBody: any = {}): Promise<void> {
  return new Promise(function (resolve, reject) {
    url = _urlHandle(url);
    const options = {
      url: url,
      method: httpMethod,
      json: true,
      headers: {
        "content-type": "application/json",
        "access-token": req._token,
        "language": req._language
      },
      body: postBody,
      timeout: 20000
    };
    request(options, function (err: Error, httpResponse: any, body: any) {
      if (err) {
        return reject((process as any)._errorEnums.SERVER_CONNECT_FAIL);
      }
      if (httpResponse) {
        if (!body || body === '{}') {
          return reject((process as any)._errorEnums.SERVER_RESP_ERROR);
        }
        if (body.errorCode !== 0) {
          return reject(body);
        }
      } else {
        return reject((process as any)._errorEnums.SERVER_CONNECT_TIMEOUT);
      }
      resolve(body);
    });
  });
}

/**
 * 响应处理
 * @param {Object} res 响应对象
 * @param {*} realResp 实际返回对象
 */
export function responseHandle(res: IResponse, realResp: any) {
  res._realResp = realResp;
  res.json(realResp);
}
