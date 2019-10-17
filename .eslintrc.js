/**
 * 创建时间：2019/06/28
 * 创建人：zhenghan 
 */

module.exports = {
  "parser": '@typescript-eslint/parser', //定义ESLint的解析器
  "extends": [
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],//定义文件继承的子规范
  "plugins": ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  /**
   * rules书写规则
   * @category 此规则属于哪种分类
   * @reason 为什么要开启（关闭）此规则
   * @fixable 支持自动修复
   */
  "rules": {
    /**
    * 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
    * @category Possible Errors
    */
    'for-direction': 'error',
    /**
     * getter 必须有返回值，并且禁止返回空，比如 return;
     * @category Possible Errors
     */
    'getter-return': [
      'error',
      {
        allowImplicit: false
      }
    ],
    /**
     * 禁止使用 console
     * @category Possible Errors
     * @reason console太常见了，但是调试过程的console要清楚
     */
    'no-console': 'off',
    /**
     * 禁止函数表达式中出现多余的括号
     * @category Possible Errors
     * @fixable
     */
    'no-extra-parens': ['error', 'functions'],
    /**
    * 禁止出现多余的分号
    * @category Possible Errors
    * @fixable
    */
    'no-extra-semi': 'error',
    /**
     * 禁止将一个函数声明重新赋值，如：
     * @category Possible Errors
     */
    'no-func-assign': 'error',
    /**
     * 禁止函数的循环复杂度超过 20，https://en.wikipedia.org/wiki/Cyclomatic_complexity
     * @category Best Practices
     */
    complexity: [
      'error',
      {
        max: 20
      }
    ],
    /**
     * if 后面必须要有 {，除非是单行 if
     * @category Best Practices
     * @fixable
     */
    curly: ['error', 'multi-line', 'consistent'],
    /**
     * switch 语句必须有 default
     * @category Best Practices
     */
    'default-case': 'warn',
    /**
     * 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
     * @category Best Practices
     * @fixable
     */
    'dot-location': ['error', 'property'],
    /**
     * 禁止出现 foo['bar']，必须写成 foo.bar
     * @category Best Practices
     * @reason 当需要写一系列属性的时候，可以更统一
     * @fixable
     */
    'dot-notation': 'off',
    /**
     * 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
     * @category Best Practices
     * @fixable
     */
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    /**
    * switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
    * @category Best Practices
    */
    'no-case-declarations': 'error',
    /**
    * 禁止在 else 内使用 return，必须改为提前结束
    * @category Best Practices
    * @fixable
    */
    'no-else-return': 'off',
    /**
     * 禁止修改原生对象
     * @category Best Practices
     */
    'no-extend-native': 'error',
    /**
     * 禁止使用 eval
     * @category Best Practices
     */
    'no-eval': 'error',
    /**
     * 禁止出现没必要的 bind
     * @category Best Practices
     * @fixable
     */
    'no-extra-bind': 'error',
    /**
    * switch 的 case 内必须有 break, return 或 throw
    * @category Best Practices
    */
    'no-fallthrough': 'error',
    /**
     * 禁止对全局变量赋值
     * @category Best Practices
     */
    'no-global-assign': 'error',
    /**
     * 禁止在全局作用域下定义变量或申明函数
     * @category Best Practices
     */
    'no-implicit-globals': 'error',
    /**
     * 禁止在 setTimeout 或 setInterval 中传入字符串，如 setTimeout('alert("Hi!")', 100);
     * @category Best Practices
     */
    'no-implied-eval': 'error',
    /**
     * 禁止在循环内的函数中出现循环体条件语句中定义的变量
     * @category Best Practices
     * @reason 太常见了，需要对属性进行判空
     */
    'no-loop-func': 'off',
    /**
     * 禁止使用 magic numbers
     * @category Best Practices
     */
    'no-magic-numbers': 'off',
    /**
     * 禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
     * @category Best Practices
     * @fixable
     */
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
        exceptions: {
          Property: true,
          BinaryExpression: false,
          VariableDeclarator: true,
          ImportDeclaration: true
        }
      }
    ],
    /**
     * 禁止直接 new 一个类而不赋值
     * @category Best Practices
     */
    'no-new': 'error',
    /**
     * 禁止使用 new Function，比如 let x = new Function("a", "b", "return a + b");
     * @category Best Practices
     */
    'no-new-func': 'error',
    /**
     * 禁止使用 new 来生成 String, Number 或 Boolean
     * @category Best Practices
     */
    'no-new-wrappers': 'error',
    /**
     * 循环内必须对循环条件的变量有修改
     * @category Best Practices
     */
    'no-unmodified-loop-condition': 'error',
    /**
     * 禁止无用的表达式
     * @category Best Practices
     */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    /**
     * 禁止在 catch 中仅仅只是把错误 throw 出去
     * @category Best Practices
     * @reason 这样的 catch 是没有意义的，等价于直接执行 try 里的代码
     */
    'no-useless-catch': 'error',
    /**
     * 禁止出现没必要的字符串连接
     * @category Best Practices
     */
    'no-useless-concat': 'error',
    /**
     * parseInt 必须传入第二个参数
     * @category Best Practices
     * @fixable
     */
    radix: 'error',
    /**
     * 必须使用 if (foo === 5) 而不是 if (5 === foo)
     * @category Best Practices
     * @fixable
     */
    yoda: [
      'error',
      'never',
      {
        onlyEquality: true
      }
    ],
    /**
     * 禁止使用保留字作为变量名
     * @category Variables
     */
    'no-shadow-restricted-names': 'error',
    /**
     * 禁止使用未定义的变量
     * @category Variables
     */
    'no-undef': [
      'error',
      {
        typeof: false
      }
    ],
    /**
     * 禁止将 undefined 赋值给变量
     * @category Variables
     * @fixable
     */
    'no-undef-init': 'error',
    /**
     * callback 中的 error 必须被处理
     * @category Node.js and CommonJS
     */
    'handle-callback-err': 'error',
    /**
     * 数组的括号内的前后禁止有空格
     * @category Stylistic Issues
     * @fixable
     */
    'array-bracket-spacing': ['error', 'never'],
    /**
     * 代码块如果在一行内，那么大括号内的首尾必须有空格
     * @category Stylistic Issues
     * @fixable
     */
    'block-spacing': ['error', 'always'],
    /**
    * 逗号前禁止有空格，逗号后必须要有空格
    * @category Stylistic Issues
    * @fixable
    */
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    /**
     * 禁止在行首写逗号
     * @category Stylistic Issues
     * @fixable
     */
    'comma-style': ['error', 'last'],
    /**
     * 用作对象的计算属性时，中括号内的首尾禁止有空格
     * @category Stylistic Issues
     * @fixable
     */
    'computed-property-spacing': ['error', 'never'],
    /**
    * 函数名和执行它的括号之间禁止有空格
    * @category Stylistic Issues
    * @fixable
    */
    'func-call-spacing': ['error', 'never'],
    /**
     * 函数赋值给变量的时候，函数名必须与变量名一致
     * @category Stylistic Issues
     */
    'func-name-matching': [
      'error',
      'always',
      {
        includeCommonJSModuleExports: false
      }
    ],
    /**
     * 函数参数要么同在一行要么每行一个
     * @category Stylistic Issues
     * @fixable
     */
    'function-paren-newline': ['error', 'multiline'],
    /**
    * jsx 中的属性必须用双引号
    * @category Stylistic Issues
    * @fixable
    */
    'jsx-quotes': ['error', 'prefer-double'],
    /**
     * 对象字面量中冒号前面禁止有空格，后面必须有空格
     * @category Stylistic Issues
     * @fixable
     */
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict'
      }
    ],
    /**
     * 关键字前后必须有空格
     * @category Stylistic Issues
     * @fixable
     */
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    /**
     * 代码块嵌套的深度禁止超过 5 层
     * @category Stylistic Issues
     */
    'max-depth': ['error', 5],
    /**
     * 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
     * @category Stylistic Issues
     */
    'max-nested-callbacks': ['error', 3],
    /**
     * 禁止行尾有空格
     * @category Stylistic Issues
     * @fixable
     */
    'no-trailing-spaces': 'error',
    /**
    * 禁止属性前有空格，比如 foo. bar()
    * @category Stylistic Issues
    * @fixable
    */
    'no-whitespace-before-property': 'error',
    /**
     * 禁止 if 后面不加大括号而写两行代码
     * @category Stylistic Issues
     * @fixable
     */
    'nonblock-statement-body-position': [
      'error',
      'beside',
      {
        overrides: {
          while: 'below'
        }
      }
    ],
    /**
     * 大括号内的首尾必须有换行
     * @category Stylistic Issues
     * @fixable
     */
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true
      }
    ],
    /**
     * 对象字面量只有一行时，大括号内的首尾必须有空格
     * @category Stylistic Issues
     * @fixable
     */
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: false
      }
    ],
    /**
    * 禁止变量申明时用逗号一次申明多个
    * @category Stylistic Issues
    */
    'one-var': ['error', 'never'],
    /**
     * 变量申明必须每行一个
     * @category Stylistic Issues
     * @fixable
     */
    'one-var-declaration-per-line': ['error', 'always'],
    /**
    * 结尾必须有分号
    * @category Stylistic Issues
    * @fixable
    */
    semi: [
      'error',
      'always',
      {
        omitLastInOneLineBlock: true
      }
    ],
    /**
     * 一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
     * @category Stylistic Issues
     * @fixable
     */
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    /**
     * 分号必须写在行尾，禁止在行首出现
     * @category Stylistic Issues
     * @fixable
     */
    'semi-style': ['error', 'last'],
    /**
     * if, function 等的大括号之前必须要有空格，比如 if (a) {
     * @category Stylistic Issues
     * @fixable
     */
    'space-before-blocks': ['error', 'always'],
    /**
     * 命名函数表达式括号前禁止有空格，箭头函数表达式括号前面必须有一个空格
     * @category Stylistic Issues
     * @fixable
     */
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    /**
     * 小括号内的首尾禁止有空格
     * @category Stylistic Issues
     * @fixable
     */
    'space-in-parens': ['error', 'never'],
    /**
     * 操作符左右必须有空格
     * @category Stylistic Issues
     * @fixable
     */
    'space-infix-ops': 'error',
    /**
     * new, typeof 等后面必须有空格，++, -- 等禁止有空格
     * @category Stylistic Issues
     * @fixable
     */
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    /**
     * 注释的斜线或 * 后必须有空格
     * @category Stylistic Issues
     * @fixable
     */
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          exceptions: ['*'],
          balanced: true
        }
      }
    ],
    /**
     * case 的冒号前禁止有空格，冒号后必须有空格
     * @category Stylistic Issues
     * @fixable
     */
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false
      }
    ],
    /**
     * 模版字符串的 tag 之后禁止有空格，比如 tag`Hello World`
     * @category Stylistic Issues
     * @fixable
     */
    'template-tag-spacing': ['error', 'never'],
    /**
     * 文件开头禁止有 BOM
     * @category Stylistic Issues
     * @fixable
     */
    'unicode-bom': ['error', 'never'],
    /**
    * 箭头函数的箭头前后必须有空格
    * @category ECMAScript 6
    * @fixable
    */
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    /**
     * constructor 中必须有 super
     * @category ECMAScript 6
     */
    'constructor-super': 'error',
    /**
     * generator 的 * 前面禁止有空格，后面必须有空格
     * @category ECMAScript 6
     * @fixable
     */
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    /**
     * 禁止对定义过的 class 重新赋值
     * @category ECMAScript 6
     */
    'no-class-assign': 'error',
    /**
     * 禁止出现难以理解的箭头函数，比如 let x = a => 1 ? 2 : 3
     * @category ECMAScript 6
     * @fixable
     */
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true
      }
    ],
    /**
     * 禁止对使用 const 定义的常量重新赋值
     * @category ECMAScript 6
     */
    'no-const-assign': 'error',
    /**
     * 禁止重复定义类
     * @category ECMAScript 6
     */
    'no-dupe-class-members': 'error',
    /**
     * 禁止重复 import 模块
     * @category ECMAScript 6
     */
    'no-duplicate-imports': 'error',
    /**
     * 禁止使用 new 来生成 Symbol
     * @category ECMAScript 6
     */
    'no-new-symbol': 'error',
    /**
     * 禁止出现没必要的计算键名，比如 let a = { ['0']: 0 };
     * @category ECMAScript 6
     * @fixable
     */
    'no-useless-computed-key': 'error',
    /**
     * 禁止出现没必要的 constructor，比如 constructor(value) { super(value) }
     * @category ECMAScript 6
     */
    'no-useless-constructor': 'error',
    /**
     * 禁止解构时出现同样名字的的重命名，比如 let { foo: foo } = bar;
     * @category ECMAScript 6
     * @fixable
     */
    'no-useless-rename': 'error',
    /**
     * 禁止使用 var
     * @category ECMAScript 6
     * @fixable
     */
    'no-var': 'error',
    /**
    * ... 的后面禁止有空格
    * @category ECMAScript 6
    * @fixable
    */
    'rest-spread-spacing': ['error', 'never']
  }
};