
import * as requestHandler from '../../public/handler/request_handler';
import { IRequest, IResponse } from 'src/types/globals';


export function loginWithoutValidation(req: IRequest) {
    /*
    * const necessaryParamsArr = ['name', 'password'];
  const paramsFlag = baseHandler.paramsJudge(necessaryParamsArr, req.body);
  if (paramsFlag) {
    return res.json({
      errorCode: 52,
      errorMsg: paramsFlag
    });
  }
  let results = {};
  const name = req.body.name;
  const password = req.body.password;
  const params = {
    name: name,
    password: password
  };
  const url = requestHandler.urlGenerator(req._apiBaseUrl, ['login'], params);
  requestHandler.requestPromise('get', url, {})
    .then(function (reply) {
      results = reply;
      const content = {
        name: reply.results.name,
        userId: reply.results.id.toString(),
        title: reply.results.title,
        firmId: reply.results.firm.id
      };

      // 前端id属性冲突,将id改成userId
      results.results.userId = reply.results.id;

      // 删除一些敏感属性
      delete reply.results.id;
      delete reply.results.password;
      delete reply.results.phone;

      // 生成token信息
      results.token = jwt.sign(
        content,
        app.get('superSecret')
      );
      const arr = results.token.split('.');
      const key = results.results.userId + reply.results.name + arr[arr.length - 1];
      const params = {
        key: key,
        value: results.token
      };
      const url = requestHandler.urlGenerator(req._apiBaseUrl, ['login', 'token'], params);
      return requestHandler.requestPromise('post', url, {});
    })
    .then(function (reply) {
      if (results.results.homePage) {
        return Promise.reject(results);
      }
      const url = requestHandler.urlGenerator(req._apiBaseUrl, ['firms', results.results.firm.id.toString()]);
      return requestHandler.requestPromise('get', url)
    })
    .then(function (reply) {
      let promiseArr = [];
      if (reply.results.homePage) {
        results.results.homePage = reply.results.homePage;
      }
      if (!results.results.homePage) {
        const userId = results.results.userId.toString();
        const url = requestHandler.urlGenerator(req._apiBaseUrl, ['users', userId, 'appMenus']);
        return requestHandler.requestPromise('get', url, {});
      } else {
        return Promise.reject(results);
      }
    })
    .then(function (reply) {
      if (reply.results && reply.results.length > 0) {
        const item = reply.results[0];
        let url = item.url;
        if (!url) {
          item.url = item.children[0].url;
          url = item.children[0].url;
          if (!url) {
            return Promise.reject({
              errorCode: 53,
              errorMsg: '您没有权限查看系统功能，请联系管理员！'
            });
          }
        }
        results.results.homePage = item;
      }
      res.json(results);
    })
    .catch(function (err) {
      res.json(err);
    });
    * */

    const params = { ...req.body };
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['login'], params);
    requestHandler.requestPromise(req, 'GET', url)
        .then(function (reply) {
            results = reply;
            const content = {
                name: reply.results.name,
                userId: reply.results.id.toString(),
                title: reply.results.title,
                firmId: reply.results.firm.id
            };

            // 前端id属性冲突,将id改成userId
            results.results.userId = reply.results.id;

            // 删除一些敏感属性
            delete reply.results.id;
            delete reply.results.password;
            delete reply.results.phone;

            // 生成token信息
            results.token = jwt.sign(
                content,
                app.get('superSecret')
            );
            const arr = results.token.split('.');
            const key = results.results.userId + reply.results.name + arr[arr.length - 1];
            const params = {
                key: key,
                value: results.token
            };
            const url = requestHandler.urlGenerator(req._apiBaseUrl, ['login', 'token'], params);
            return requestHandler.requestPromise('post', url, {});
        })
    return requestHandler.requestPromise(req, 'GET', url);
}