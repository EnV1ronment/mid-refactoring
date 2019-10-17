const log4js = require('log4js');

log4js.configure({
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
  disableClustering: true,
  appenders: {
    console: { type: 'console' }, // 控制台输出
    info: {
      type: 'dateFile',
      filename: __dirname + `/logs/info`, // 您要写入日志文件的路径
      alwaysIncludePattern: true, // （默认为false） - 将模式包含在当前日志文件的名称以及备份中
      daysToKeep: 10, // 时间文件 保存多少天，距离当前天daysToKeep以前的log将被删除
      // compress : true,// （默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: '-yyyy-MM-dd-hh.log', // （可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8', // default 'utf-8'，文件的编码
    },
    errorLog: {
      type: 'dateFile',
      filename: __dirname + `/logs/error`, // 您要写入日志文件的路径
      alwaysIncludePattern: true, // （默认为false） - 将模式包含在当前日志文件的名称以及备份中
      daysToKeep: 10, // 时间文件 保存多少天，距离当前天daysToKeep以前的log将被删除
      // compress : true,// （默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: '-yyyy-MM-dd-hh.log', // （可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8', // default 'utf-8'，文件的编码
    },
    error: { type: 'logLevelFilter', level: 'error', appender: 'errorLog', category: 'production' }
  },
  replaceConsole: true,
  categories: {
    default: { appenders: ['info', 'console'], level: 'info' }, // 默认log类型，输出到控制台 log文件 log日期文件 且登记大于info即可
    production: { appenders: ['error', 'info', 'console'], level: 'info' },  // 生产环境 类型 只输出到按日期命名的文件，且只输出警告以上的
    console: { appenders: ['console'], level: 'debug' }, // 开发环境  输出到控制台
    error: { appenders: ['error'], level: 'error' } // error 等级log 单独输出到error文件中 任何环境的errorlog 将都以日期文件单独记录
  }
});

export default log4js.getLogger('production');