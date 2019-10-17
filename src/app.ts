import cookieParser from 'cookie-parser';
import fs from 'fs';
import createError from 'http-errors';
import express from 'express';
import { NextFunction } from 'express';
import path from 'path';
import log4j from 'log4js';
import logger from '../log4j_config';
import { getHeaderData } from './public/middleware/middleware';
import { IRequest, IResponse, IError } from './types/globals';
const CONFIG_ERROR = require('./config/config_error.json');

// Init express
const app = express();

// 设置全局错误对象，方便错误返回
(process as any)._errorEnums = CONFIG_ERROR;
// 设置全局根目录，方便绝对路径使用
(process as any)._rootDir = __dirname;

// 设置view目录, 设置模板为jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 跨域请求设置
// app.use(function (req: Request, res: Response, next: NextFunction) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Request-Method', 'PUT,POST,GET,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, t, access-token, firm-id, firm-code, station-id, station-code');
//     next();
// });

// 获取基础url
app.use(getHeaderData);

app.use(log4j.connectLogger(logger, {
  level: 'auto', format: (req: IRequest, res: IResponse, format) => format(`
  /********** access log start **********/
  Request Method: :method 
  Request URL: :url  
  Request IP: ${req.hostname}
  Response Status: :status  
  Response Time: :response-time ms 
  Request Body: ${JSON.stringify(req.query) === '{}' ? JSON.stringify(req.body) : JSON.stringify(req.query)}
  Response Body: ${JSON.stringify(res._realResp) || null}
  /********** access log end **********/`)
}));

// app.use(BaseRouter);

function _fileDisplay(filePath: string) {
  // 根据文件路径读取文件，返回文件列表
  const dirs = fs.readdirSync(filePath);
  for (let fileName of dirs) {
    // 获取当前文件的绝对路径
    const filedir = path.join(filePath, fileName);
    const stats = fs.statSync(filedir);
    const isFile = stats.isFile();
    const isDir = stats.isDirectory();
    if (isFile) {
      const handler = require(filedir).default;
      const routeSplit = filedir.split(path.sep);
      let route = `/${routeSplit[routeSplit.length - 2]}`;
      let sufRoute = `/${routeSplit[routeSplit.length - 1].replace('_', '/').replace('.ts', '').replace('.js', '')}`;
      if(route !== sufRoute){
        route = route + sufRoute;
      }
      app.use(route, handler);
    }
    if (isDir) {
      _fileDisplay(filedir);
    }
  }
}

// 导入路由
_fileDisplay(path.join(__dirname, 'routes'));

// catch 404 and forward to error handler
app.use(function (req: IRequest, res: IResponse, next: NextFunction) {
  next(createError(404));
});

// 自定义错误中间件
app.use(function (err: IError, req: IRequest, res: IResponse, next: NextFunction) {
  if (err.errorCode !== 0) {
    logger.error(err);
  }
  if (err.results || typeof err.errorCode !== 'undefined' || err.error) {
    if (err.errorCode === 9) {
      err.errorCode = 53;
    }
    if (err.errorCode === 11 || err.errorCode === 8 || err.errorCode === 12) {
      err.errorCode = 300;
    }
    if (err.errorCode !== 0 && err.errorCode !== 51 && err.errorCode !== 300 && err.errorCode !== 53) {
      err.errorCode = 52;
    }
    return res.json(err);
  }
  next(err);
});

// error handler
app.use(function (err: IError, req: IRequest, res: IResponse) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export express instance
export default app;
