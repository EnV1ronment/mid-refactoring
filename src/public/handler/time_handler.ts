// 时间处理模块
import moment from 'moment';

interface formatTimeObj {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  curTime: string;
  curDate: string;
}

/**
 * 检测日期格式是否正确
 * @param {String} dateStr 日期字符串
 * @param {String} dateFormat 日期格式 | YYYY-MM-DD HH:MM:SS
 */
export function checkDateFormat(dateStr: string, dateFormat: string = 'YYYY-MM-DD HH:MM:SS'): boolean {
  const checkReg: any = {
    'YYYY-MM-DD HH:MM:SS': /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
    'YYYY-MM-DD HH:MM': /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/,
    'YYYY-MM-DD HH': /^(\d{4})-(\d{2})-(\d{2}) (\d{2})$/,
    'YYYY-MM-DD': /^(\d{4})-(\d{2})-(\d{2})$/,
    'YYYY-MM': /^(\d{4})-(\d{2})$/,
    'YYYY': /^(\d{4})$/,
  };
  return checkReg[dateFormat].test(dateStr);
}

/**
 * 日期是否存在
 * @param {String} dateStr 日期字符串 | YYYY-MM-DD
 */
export function isExistDate(dateStr: string): boolean {
  const dateArr = dateStr.split('-');
  // 每月最大的天数限制
  const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const theYear = parseInt(dateArr[0], 10);
  const theMonth = parseInt(dateArr[1], 10);
  const theDay = parseInt(dateArr[2], 10);
  // 判断是否为闰年
  const isLeap = new Date(theYear, 1, 29).getDate() === 29;

  // 如果是闰年,2月最大天数修改为29
  if (isLeap) {
    daysOfMonth[1] = 29;
  }

  // 判断日期是否在最大范围内
  return theDay <= daysOfMonth[theMonth - 1];
}

/**
 * 日期检测
 * @param {Arrat} dateArr 日期字符串数组
 * @param {Arrat} dateFormatArr 日期格式字符串数组
 * @param {Arrat} paramsArr 参数数组
 */
export function checkDate(dateArr: string[], dateFormatArr: string[], paramsArr: string[]) {
  const dateLen = dateArr.length;
  const dateFormatLen = dateFormatArr.length;
  const paramsLen = paramsArr.length;
  if (dateLen !== dateFormatLen || dateFormatLen !== paramsLen || dateLen !== paramsLen) {
    throw new Error();
  }
  for (let i = 0; i < dateLen; ++i) {
    if (!isExistDate(dateArr[i])) {
      throw new Error();
    }
    if (!checkDateFormat(dateArr[i], dateFormatArr[i])) {
      throw new Error();
    }
  }
  return true;
}

/**
 * 得到某天的查询时间字符串
 * @param {String} certianDay 某天  例: 2018-01-01
 */
export function getSelectStrByDay(date: string): string {
  checkDate([date], ['YYYY-MM-DD'], ['date']);
  return `${date} 00:00:00,${date} 23:59:59`;
}

/**
 * 日期格式数据填充0
 * @param {Object} obj 时间对象
 */
export function dateFormat(obj: any): any {
  for (let key in obj) {
    if (obj[key] < 10) {
      obj[key] = '0' + obj[key];
    }
  }
  return obj;
}

/**
 * 得到格式化后的当前时间
 */
export function getFormatTimeObj(): formatTimeObj {
  const date = new Date();
  const dateObj = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };
  let timeObj = dateFormat(dateObj);
  timeObj.curTime = `${timeObj.year}-${timeObj.month}-${timeObj.day} ${timeObj.hour}:${timeObj.minute}:${timeObj.second}`;
  timeObj.curDate = `${timeObj.year}-${timeObj.month}-${timeObj.day}`;
  return timeObj;
}

/**
 * 在基础时间上增加或减少一个时间间隔(以天为单位)
 *
 * @param {String} baseTime 例: 2018-01-01
 * @param {Number} timeInterval 例: 往前推3天,-3;往后推3天,3
 *
 */
export function getDateAfterCalculate(baseTime: string, timeInterval: number): string {
  let fullDate: string[] = baseTime.split('-');
  let date = new Date(parseInt(fullDate[0], 10), parseInt(fullDate[1], 10) - 1, parseInt(fullDate[2], 10), 0, 0, 0);
  // 得到那一天的日期
  date.setDate(date.getDate() + timeInterval);
  let year = date.getFullYear();
  let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  return (year + '-' + month + '-' + day);
}

/**
 * 得到某月的日期列表
 *
 * @param {String} certainMonth 某月 例: 2018-01
 *
 */
export function getCertainMonthDays(certainMonth: string): string[] {
  const dateArr: string[] = certainMonth.split('-');
  const startYear: number = parseInt(dateArr[0], 10);
  let startMonth: string = dateArr[1];
  let monthDays: number = new Date(startYear, parseInt(dateArr[1], 10), 0).getDate();
  if (parseInt(dateArr[1], 10) < 10) {
    startMonth = '0' + startMonth;
  }
  let days = [];
  for (let i: number = 1; i <= monthDays; i++) {
    let day: string
    if (i < 10) {
      day = '0' + i;
    } else {
      day = i.toString();
    }
    days[days.length] = startYear + '-' + startMonth + '-' + day;
  }
  return days;
}

/**
 * 得到两个日期之间的日期
 *
 * @param {String} startDate 开始时间 例: 2018-01-01
 * @param {String} endDate 结束时间 例: 2018-02-01
 *
 */
export function getDaysByArgs(startDate: string, endDate: string): string[] {
  const startArr = startDate.split('-');
  const endArr = endDate.split('-');
  const startYear = parseInt(startArr[0], 10);
  const startMonth = parseInt(startArr[1], 10);
  const startDay = parseInt(startArr[2], 10);
  const endYear = parseInt(endArr[0], 10);
  const endMonth = parseInt(endArr[1], 10);
  const endDay = parseInt(endArr[2], 10);
  const oneDayMilliseconds = 1000 * 60 * 60 * 24;
  const _startDate: any = new Date(startYear, startMonth - 1, startDay);
  const _endDate: any = new Date(endYear, endMonth - 1, endDay);
  const dayInterval = (_endDate - _startDate) / oneDayMilliseconds;
  let _days = [];
  let _year = startYear;
  let _month: any = startMonth;
  let _incremental = startDay;
  for (let j = 0; j <= dayInterval; j++) {
    let temp = [_year, _month].join('-');
    let currentMonthLength = getCertainMonthDays(temp).length;
    let _day: any = _incremental;
    // 当增量超过当月长度时,月份增加,天数减去当月天数,增量重置
    if (_incremental > currentMonthLength) {
      _month = parseInt(_month, 10) + 1;
      _day = _incremental - currentMonthLength;
      _incremental = _day;
    }
    if (_day < 10) {
      _day = '0' + _day;
    }
    if (_month < 10) {
      _month = '0' + parseInt(_month, 10);
    }
    if (_month > 12) {
      _month = parseInt(_month, 10) - 12;
      if (_month < 10) {
        _month = '0' + parseInt(_month, 10);
      }
      _year++;
    }
    _days[_days.length] = [_year, _month, _day].join('-');
    _incremental++;
  }
  return _days;
}

/**
 * 得到两个日期间的时间点
 * @param {String} startDate 开始时间 例: 019-04-10
 * @param {String} endDate 结束时间 例: 019-04-10
 * @param {Number} interval 间隔 例: 15
 */
export function getTimePoint(startDate: string, endDate: string, interval: number): string[] {
  const dateArr = getDaysByArgs(startDate, endDate);
  const timePointArr = [];
  for (let day of dateArr) {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute = minute + interval) {
        let timePoint = day;
        if (hour < 10) {
          timePoint = `${timePoint} 0${hour}`;
        } else {
          timePoint = `${timePoint} ${hour}`;
        }
        if (minute < 10) {
          timePoint = `${timePoint}:0${minute}`;
        } else {
          timePoint = `${timePoint}:${minute}`;
        }
        timePoint = `${timePoint}:00`;
        timePointArr.push(timePoint);
      }
    }
  }
  return timePointArr;
}

/**
 * 得到两个月份之间的月份
 * @param {String} startDate 开始月份 例: 2019-04或者2019-04-10
 * @param {String} endDate 结束月份 例: 2019-04或者2019-04-10
 */
export function getMonthBetween(startDate: string, endDate: string): string[] {
  let months = [];
  let s: any[] = startDate.split("-");
  let e: any[] = endDate.split("-");
  let min = new Date();
  let max = new Date();
  // 开始日期
  min.setFullYear(s[0], s[1] * 1 - 1, 1);
  // 结束日期
  max.setFullYear(e[0], e[1] * 1 - 1, 1);
  let curr = min;
  // eslint-disable-next-line no-unmodified-loop-condition
  while (curr <= max) {
    const month = curr.getMonth();
    months.push(moment(curr).format('YYYY-MM'));
    curr.setMonth(month + 1);
  }
  return months;
}

/**
 * 比较时间的大小
 * @param {String} time1 例: 2018-01-01 00:00:00
 * @param {String} time2
 * @param {String} timeType
 */
export function compareTime(time1: string, time2: string, timeType: string = 'minute'): number {
  const dayInterval = getDaysByArgs(time1.substr(0, 10), time2.substr(0, 10)).length - 1;
  const hour = parseInt(time1.substr(11, 2), 10);
  const hour2 = parseInt(time2.substr(11, 2), 10);
  const minute = parseInt(time1.substr(14, 2), 10);
  const minute2 = parseInt(time2.substr(14, 2), 10);
  const second = parseInt(time1.substr(17, 2), 10);
  const second2 = parseInt(time2.substr(17, 2), 10);
  let time1ToMinute;
  let time2ToMinute;
  let results;
  if (timeType === 'minute') {
    time1ToMinute = hour * 60 + minute;
    time2ToMinute = hour2 * 60 + minute2;
  } else {
    time1ToMinute = hour * 60 * 60 + minute * 60 + second;
    time2ToMinute = hour2 * 60 * 60 + minute2 * 60 + second2;
  }
  results = dayInterval * 24 * 60 + time2ToMinute - time1ToMinute;
  if (results < 0) {
    // 如果小于0则加上一天的秒数
    results += 24 * 60 * 60;
  }
  return results;
}

/**
 * 比较时间的大小
 *
 * @param {String} time1 例: 00:00:00
 * @param {String} time2
 */
export function compareTime2(_time1: string, _time2: string): number {
  let time1Arr = _time1.split(':');
  let time2Arr = _time2.split(':');
  let time1ToSecond = parseInt(time1Arr[0], 10) * 60 + parseInt(time1Arr[1], 10) * 60 + parseInt(time1Arr[2], 10);
  let time2ToSecond = parseInt(time2Arr[0], 10) * 60 + parseInt(time2Arr[1], 10) * 60 + parseInt(time2Arr[2], 10);
  return time1ToSecond - time2ToSecond;
}

/**
 * 毫秒转时分秒的显示
 *
 * @param {String} msd 毫秒值字符串
 *
 */
export function msToDate(msd: string) {
  let time = parseFloat(msd) / 1000;
  let result: string;
  let t = 'd';
  let h = 'h';
  let m = 'min';
  let s = 's';
  if (time) {
    if (time > 60 && time < 60 * 60) {
      let item = time / 60.0;
      let hour = item;
      let second = (item - hour) * 60;
      result = `${hour}${m}`;
      if (second) {
        result = result + `${second}${s}`;
      }
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      let item = time / 3600.0;
      let hour = time / 3600.0;
      let minute = (item - hour) * 60;
      let second = ((item - hour) * 60 - minute) * 60;
      result = `${hour}${h}`;
      if (minute) {
        result = result + `${minute}${m}`;
      }
      if (second) {
        result = result + `${second}${s}`;
      }
    } else if (time >= 60 * 60 * 24 && time < 60 * 60 * 24 * 30) {
      let item = time / (86400.0);
      let day = item;
      let hour = (item - day) * 24;
      let minute = (((item - day) * 24) - hour) * 60;
      result = `${day}${t}`;
      if (hour) {
        result = result + `${hour}${h}`;
      }
      if (minute) {
        result = result + `${minute}${m}`;
      }
    } else {
      result = `${time}${s}`;
    }
  } else {
    result = `0${s}`;
  }
  return result;
}
