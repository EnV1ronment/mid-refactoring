import {NextFunction, Router} from "express";
import {IRequest, IResponse} from "../../types/globals";
import * as requestHandler from "../../public/handler/request_handler";
import * as strategyCommandRecordControllers from "../../controllers/strategyCommandRecord/strategyCommandRecordControllers";
import * as runStrategiesControllers from "../../controllers/runStrategies/runStrategiesControllers";

const router = Router();
/**
 * @api {get} /optimal-dispatching/current-running-policy 当前运行策略
 * @apiVersion 0.0.0
 * @apiGroup Optimal-dispatching
 * @apiDescription 获取当前运行策略
 * @apiHeader {String} access-token 用户Token
 * @apiParam {string} stationCode 电站代码
 * @apiParam {string} statusCode 执行状态代码
 * @apiSampleRequest http://192.168.2.130:3001/optimal-dispatching/current-running-policy
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const params = {
            ...req.query
        };
        const reply:any = await runStrategiesControllers.getRunStrategies(req, params);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});

/**
 * @api {get} /optimal-dispatching/current-running-policy/history 策略执行记录
 * @apiVersion 0.0.0
 * @apiGroup Optimal-dispatching
 * @apiDescription 获取策略执行记录
 * @apiHeader {String} access-token 用户Token
 * @apiParam {Number} deviceId 设备Id
 * @apiParam {string} startDate 开始时间
 * @apiParam {string} endDate 结束时间
 * @apiSampleRequest http://192.168.2.130:3001/optimal-dispatching/current-running-policy/history
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/history', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const params = {
            ...req.query
        };
        const reply:any = await strategyCommandRecordControllers.getStrategyCommandRecord(req, params);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
export default router;