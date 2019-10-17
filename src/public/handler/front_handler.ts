/* eslint-disable complexity */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-concat */
/* eslint-disable radix */
// 前端数据处理模块

/**
 * 分页参数处理
 * @param {Object} origin
 * @param {Object} target
 */
export function pagingHandle(origin: any, target: any): any {
  target.page = origin.page;
  target.size = origin.size;
  target.totalCount = origin.totalCount;
  target.totalPages = origin.totalPages;
  return target;
}

/**
 * 枚举值处理
 * @param {Object} origin
 * @param {Object} target
 */
export function enumsHandle(origin: any, target: any, propertyMap: any = { name: 'title', value: 'id' }): any {
  if (!Array.isArray(origin)) {
    return target;
  }
  for (let i = 0, len = origin.length; i < len; i++) {
    let item: any = {};
    for (let key in propertyMap) {
      item[key] = origin[i][propertyMap[key]];
    }
    target.push(item);
  }
  return target;
}

/**
 * 适用月份修改
 * @param {Object} origin
 */
export function runMonthHandler(origin: any) {
  let runMonth = origin.runMonth.split(',');
  let arr = [];
  if (runMonth.length <= 1) {
    return origin;
  }
  let item = [[parseInt(runMonth[0])]];
  let index = 0;
  for (let i = 0, len = runMonth.length - 1; i < len; i++) {
    let cur = parseInt(runMonth[i]);
    let next = parseInt(runMonth[i + 1]);
    if (next - cur === 1) {
      item[index].push(next);
    } else {
      item.push([next]);
      index++;
    }
  }
  for (let subItem of item) {
    let value = subItem.length === 1 ? subItem[0] : [subItem[0], subItem[subItem.length - 1]].join('~');
    arr.push(value);
  }
  origin.runMonthTitle = item.length ? arr.join(',') : origin.runMonth;
  return origin;
}

/**
 * 容量单位判断
 * @param {*} energyTypeCode
 */
export function scaleUnitHandle(energyTypeCode: number) {
  return energyTypeCode === 1
    ? 'MWh'
    : energyTypeCode === 2
      ? 'MWp'
      : 'MW';
}

/**
 * 添加唯一标识
 * @param {Object} origin
 */
export function uniqueIdHandler(object: any, key: any) {
  let target = [];
  if (key !== -1) {
    key = key + '-';
  } else {
    key = '';
  }
  if (typeof object === 'object' && object.length) {
    target = object.map((item: any, index: number) => {
      item.key = key + index;
      if (item.children && item.children.length) {
        item.children = uniqueIdHandler(item.children, item.key);
      }
      return item;
    });
    return target;
  } else {
    object.key = key + 0;
    if (object.children && object.children.length) {
      object.children = uniqueIdHandler(object.children, object.key);
    }
    return object;
  }
}
