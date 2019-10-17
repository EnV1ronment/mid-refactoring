const fs = require('fs');
const exec = require('child_process').exec;

/**
 * 模版字符串中子项的处理
 * @param {*} value
 */
function _templateStrHandle(value) {
  if (value === undefined) {
    return undefined;
  }
  let _value = JSON.parse(JSON.stringify(value));
  if (Array.isArray(_value)) {
    // 数组处理
    for (let i = 0, len = _value.length; i < len; ++i) {
      _value[i] = JSON.stringify(_value[i]);
    }
    _value = `[${_value.join(',')}]`;
  } else if (typeof _value === 'string') {
    // 字符串处理
    _value = JSON.stringify(_value);
  } else if (_value instanceof Object) {
    let arr = [];
    for (let key in _value) {
      // console.log(key);
      _value[key] = _templateStrHandle(_value[key]);
      const _key = _templateStrHandle(key);
      arr.push(`${_key}: ${_value[key]}`);
    }
    _value = `{${arr.join(',')}}`;
  }
  return _value;
}

function _getValuesFromObject(obj) {
  const arr = [];
  for (let key in obj) {
    // 模版字符串中使用字符串需要多加一对引号
    let value = obj[key];
    value = _templateStrHandle(value);
    arr.push(value);
  }
  return arr;
}

function _cmdExec(cli) {
  exec(cli, { encoding: 'utf8' }, function (err, stdout, stderr) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('stdout' + stdout);
    console.log('stderr' + stderr);
  });
}

const testUnit = {
  /**
   * 测试字符串自动生成
   * @param {Object} suite 测试套件对象
   */
  testGenerator: function (suite, isReWriteFile = false) {
    // suite数据结构
    // const suite = {
    //   moduleName: '模块名',
    //   funcName: '方法名',
    //   testCase: [{
    //     params: {
    //       参数key: 参数值,
    //       参数key: 参数值
    //     },
    //     operator: '操作符 | 参考should API 如equal, throw, be.ok',
    //     results: 结果值
    //   }, {
    //     params: {
    //       target: 1.1237,
    //       abc: 2
    //     },
    //     operator: 'throw',
    //     results: ''
    //   }]
    // };
    // describe(`test/dataToFix`, function () {
    //   it(`should return 1.12 when target = 1.1237`, function () {
    //     baseHandler.dataToFix(1.1237).should.equal(1.12);
    //   });
    // })
    // 语法规则
    // should return 结果 when 参数 is 值 and ...
    const {
      path,
      fileName,
      funcName,
      testCase
    } = suite;
    const moduleName = '_';
    const arr = [];
    let resultsStr = `describe('test/${funcName}', function () { `;
    for (let item of testCase) {
      let {
        results,
        params,
        operator
      } = item;
      let it;
      const values = _getValuesFromObject(params);
      const paramsArr = [];
      results = _templateStrHandle(results);
      for (let key in params) {
        paramsArr.push(`${key} is ${params[key]}`);
      }
      if (operator.includes('throw')) {
        it = `it('should return ${results} when ${paramsArr.join(' and ')}', function () {
        ${moduleName}.${funcName}.bind(${moduleName}, ${values.join(',')}).should.${operator};
      });`;
      } else if (results === undefined || results === null) {
        it = `it('should return ${results} when ${paramsArr.join(' and ')}', function () {
        (${moduleName}.${funcName}(${values.join(',')}) === ${results}).should.${operator};
      });`;
      } else {
        it = `it('should return ${results} when ${paramsArr.join(' and ')}', function () {
        ${moduleName}.${funcName}(${values.join(',')}).should.${operator}(${results});
      });`;
      }
      arr.push(it);
    }
    resultsStr += arr.join('\n\n');
    resultsStr += `});\n\n`;
    fs.stat(`${__dirname}/test/${fileName}.test.js`, function (err, stat) {
      if (err) {
        console.log(err);
      }
      if (stat && stat.isFile() && !isReWriteFile) {
        fs.appendFileSync(`${__dirname}/test/${fileName}.test.js`, resultsStr);
      } else {
        resultsStr = `const should = require('should'); 
      const ${moduleName} = require('${__dirname}${path}${fileName}');
      \n` + resultsStr;
        fs.writeFileSync(`${__dirname}/test/${fileName}.test.js`, resultsStr);
      }
    });
  },

  autoTest: function (fileName) {
    _cmdExec(`nyc --reporter=html mocha ./test/${fileName}.test.js --exit`);
  }
};

const suite = {
  path: '/public/handler/',
  fileName: 'time_handler',
  funcName: 'dateFormat',
  testCase: [{
    params: {
      obj: {
        a: 1,
        b: 9,
        c: 10
      },
    },
    operator: 'eql',
    results: {
      a: '01',
      b: '09',
      c: 10
    },
  }]
};

testUnit.testGenerator(suite);
testUnit.autoTest(suite.fileName);

module.exports = testUnit;