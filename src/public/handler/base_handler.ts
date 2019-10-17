// 基础处理模块

// 设备中英文对照字典
import app from "../../app";
const jwt = require('jsonwebtoken');

const DEVICE_DICTIONARY: any = {
  id: 'ID',
  code: '设备代码',
  name: '设备编号',
  title: '设备名',
  p: '有功量测',
  q: '无功量测',
  runningCost: '运行成本',
  depreciationFee: '折旧费用',
  minSOC: '最小SOC',
  maxSOC: '最大SOC',
  initSOC: '初始SOC',
  maxChargePower: '最大充电功率',
  maxDischargePower: '最大放电功率',
  efficiency: '充放电效率',
  selfLossCoefficient: '自损耗系数',
  climbingRateCoefficient: '爬坡率系数',
  capacity: '容量',
  terminalId: '终端ID',
  pathName: '路径',
  bridges: '桥接',
  ratedkV: '额定电压',
  substation: '变电站',
  iNode: 'i节点',
  jNode: 'j节点',
  zNode: 'z节点',
  baseVoltage: '电压等级',
  ratedP: '有功量测',
  ratedQ: '无功量测',
  ac2dcEfficiency: '交流-直流转化效率',
  dc2acEfficiency: '直流-交流转化效率',
  type: '类型',
  noLoadLoss: '空载损耗',
  excitingCurrent: '空载电流百分比',
  ifTerm: '是否期限内',
  recordApp: '记录',
  baseVoltageId: '基础电压ID',
  windingType: '绕组类型（高中低）',
  tapChangerType: '变压器分接头类型类',
  ratedMva: '额定功率',
  loadLoss: '短路损耗',
  leakageImpedance: '短路电压百分比',
  x: '电阻',
  r: '电抗',
  x0: '零序电阻',
  r0: '零序电抗',
  d: '档位量测',
  rectifierinverters: '变流器(pcs)',
  StorageBox: '储能柜',
  SystemLoad: '系统负荷',
  PhotovoltaicBox: '光伏柜',
  IceStorage: '冰蓄冷',
  Boiler: '锅炉',
  iceLoad: '冷负荷',
  hotLoad: '热负荷',
  Breaker: '断路器',
  RectifierInverter: '变流器',
  ChargingPile: '充电桩',
  Storage: '电池堆',
  ConnectivityNode: '连接节点',
  PowerTransformer: '变压器',
  Pack: '电池组',
  Switch: '开关'
};

/**
 * 设备字典属性英文转中文
 * @param {String} key
 */
export function englishToChinese(key: string): string {
  return DEVICE_DICTIONARY[key];
}

/**
 * 填充特定字符串到待填充的字符串，补足长度
 * @param {String} str 待填充字符串
 * @param {Number} digits 指定的位数
 * @param {String} replacedStr 填充字符串 | '0'
 * @param {String} location 插入的位置,start为前，end为后 | start
 */
export function digitsFill(str: string, digits: number, replacedStr: string = '0', location: string = 'start') {
  const initLen = str.length;
  // 原字符串长度大于指定长度，直接返回原字符串
  if (initLen >= digits) {
    return str;
  }
  // 填充完后截取指定的位数
  if (location === 'start') {
    str = str.padStart(digits, replacedStr);
  } else {
    str = str.padEnd(digits, replacedStr);
  }
  return str;
}

/**
 * 克隆对象-序列化反序列化法
 * 有些特殊的类型无法克隆，但业务数据都是数组和对象，足够正常使用
 * 不增加复杂度就先使用该方法
 * @param {Object} obj 待克隆对象
 */
export function cloneObj(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 判断是否缺少必须的参数
 * @param {Array} necessaryParamsArr 必须的参数列表
 * @param {Object} postParamsObj 请求的参数对象
 */
export function paramsJudge(necessaryParamsArr: string[], postParamsObj: any): string {
  let results: string = '';
  const missArr: string[] = [];
  // 如果传入的对象属性不是对象，则置为空对象，保持后面逻辑不变
  if (typeof postParamsObj === 'undefined' || postParamsObj === null || postParamsObj === '') {
    postParamsObj = {};
  }
  // 遍历必要参数数组，如果请求参数对象中没有找到该属性，则推入missArr
  for (let i = 0, len = necessaryParamsArr.length; i < len; ++i) {
    if (typeof postParamsObj[necessaryParamsArr[i]] === 'undefined') {
      missArr.push(necessaryParamsArr[i]);
    }
  }
  if (missArr.length) {
    results = `${missArr.join('，')}参数不能为空`;
  }
  return results;
}

/**
 * 得到目标对象下的全部子对象数组
 * @param {Object} target 目标对象
 * @param {String} child 子对象属性，默认children
 */
export function getAllChildren(target: any, child: string = 'children'): any[] {
  let arr: any[] = [];
  function getChildren(item: any) {
    arr.push(item);
    if (Array.isArray(item[child]) && item[child].length) {
      for (let i = 0, len = item[child].length; i < len; i++) {
        getChildren(item[child][i]);
      }
    }
  }
  getChildren(target);
  return arr;
}

/**
 * 得到具有某个特殊属性的子对象,找到即返回
 * @param {Object} target 目标对象
 * @param {Array} reply 返回数组
 * @param {String} property 特殊属性名 默认firmType
 * @param {String} child 子对象属性名 默认children
 */
export function getChildrenBySpecialProperty(target: any, reply: any[], property: string = 'firmType', child: string = 'children') {
  if (target[property]) {
    reply.push(target);
    return;
  }
  for (let i = 0, len = target[child].length; i < len; i++) {
    getChildrenBySpecialProperty(target[child][i], reply, property, child);
  }
}

/**
 * 数据位数处理
 * @param {Number} target 目标值
 * @param {Number} digits 保留的位数
 */
export function dataToFix(target: number, digits: number = 2) {
  let value: number = target;
  if (isNaN(value) || !isFinite(value)) {
    // NaN, Infinity 或者非数字类型抛出错误
    throw new Error(`TypeError：DataToFix parameter page needs to be of type number`);
  }
  if (value === 0) {
    return 0;
  }
  // 判断是否含有小数
  let string: string = value.toString();
  if (!string.includes('.')) {
    // 整数
    return parseInt(string, 10);
  }
  // 小数
  let radix = Math.pow(10, digits);
  value = parseFloat(string);
  value = Math.round(value * radix) / radix;
  return value;
}

/**
 * 基础返回对象
 * @param {*} baseDataType
 */
export function baseRespFactory(baseDataType: any = []) {
    return {
        results: baseDataType,
        errorCode: 0,
        errorMsg: ''
    };
}
/**
 * 生成Token
 * @param {*} content
 */
export function createToken(content: any = []) {
    return jwt.sign(
        content,
        app.get('superSecret')
    );
}
