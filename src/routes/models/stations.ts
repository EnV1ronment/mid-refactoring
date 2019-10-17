import { NextFunction, Router } from 'express';
import { IRequest, IResponse } from '../../types/globals';
import * as requestHandler from '../../public/handler/request_handler';
import * as stationControllers from '../../controllers/stations/stationsControllers';
import { deflate } from 'zlib';

// Init shared
const router = Router();

/**
 * route列表
 * 1.获取电站列表 测试通过
 * 2.新增电站 测试通过
 * 3.查询电站详情 测试通过
 * 4.全量修改电站 测试通过
 * 5.删除电站 测试通过
 * 6.变量修改电站 测试通过
 * 7.修改电站电价 测试通过
 */

/**
 * 单位类型对应处理
 * @param {Obejct} origin 原数据对象
 * @param {Object} target 目标对象
 * @param {String} property 属性
 */
function _firmTypeHandle(origin: any, target: any, property: string): any {
  target[`${property}Id`] = origin.id;
  target[`${property}Title`] = origin.abbreviation;
  return target;
}

/**
 * @api {get} /models/stations 获取电站列表
 * @apiVersion 0.0.0
 * @apiGroup Model-Stations
 * @apiDescription 获取电站列表
 */
router.get('/', async (req: IRequest, res: IResponse, next: NextFunction) => {
  try {
    const stations = await stationControllers.getStations(req);
    // todo
    requestHandler.responseHandle(res, stations);
  } catch (e) {
    next(e);
  }
});

export default router;
