import {NextFunction, Router} from "express";
import {IRequest, IResponse} from "../../types/globals";
import * as requestHandler from "../../public/handler/request_handler";
import * as baseHandler from "../../public/handler/base_handler";
import * as measurementsControllers from "../../controllers/measurements/measurementsControllers";

const router = Router();
/**
 * @api {post} /on-line-monitoring/system-wiring/realtime 系统接线图实时值
 * @apiVersion 0.0.0
 * @apiGroup On-line-monitoring
 * @apiDescription 获取系统接线图实时值
 * @apiHeader {String} access-token 用户Token
 * @apiParam {Number[]} analogArr 点号数组
 * @apiParam {Number[]} breakerArr 点号数组
 * @apiParam {Number[]} switchArr 点号数组
 * @apiParam {Number[]} disconnectorsArr 点号数组
 * @apiSampleRequest http://192.168.2.130:3001/on-line-monitoring/system-wiring/realtime
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.post('/realtime', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        let results:any = {
            analogValueArr: [],
            breakerValueArr: [],
            switchValueArr: [],
            disconnectorsValueArr: [],
            errorCode: 0,
            errorMsg: ''
        };
        const analogArr = req.body.analogArr;
        const breakerArr = req.body.breakerArr;
        const switchArr = req.body.switchArr;
        const disconnectorsArr = req.body.disconnectorsArr;
        const obj:any = {
            analogArr: analogArr,
            breakerArr: breakerArr,
            switchArr: switchArr,
            disconnectorsArr: disconnectorsArr
        };
        for (let _key in obj) {
            const params = {
                pointNumber: obj[_key]
            };
            const reply:any = await measurementsControllers.getMeasurementsRealtime(req, params);
            for (let key in reply.results) {
                let value = baseHandler.dataToFix(reply.results[key], 1);
                /*if (process._statusPointNumber[key]) {
                    value = process._statusPointNumber[key][parseInt(value)] || '';
                }
                if (specialAnalog.includes(key) && reply.results[key] !== '' && reply.results[key] !== 'null') {
                    const num = Math.abs(reply.results[key]);
                    const hour = Math.floor(num);
                    const minute = Math.floor((num - hour) * 60);
                    value = `${hour}时${minute}分"`;
                    if (hour > 24 || hour < 0) {
                        value = '';
                    }
                }
                if (IPC_TIME_ANALOG.includes(key)) {
                    // 工控机时间戳以秒为单位
                    // 默认超过5分钟则为超时
                    const currentTime = new Date().getTime() / 1000;
                    const timeInterval = currentTime - reply.results[key];
                    if (timeInterval > 5 * 60) {
                        value = "通信中断";
                    }
                }*/
                results[obj[_key]][results[obj[_key]].length] = {
                    name: key,
                    value: value
                };
            }
        }
        requestHandler.responseHandle(res, results);
    } catch (e) {
        next(e);
    }
});

/**
 * @api {get} /on-line-monitoring/system-wiring/history 系统接线图历史值
 * @apiVersion 0.0.0
 * @apiGroup On-line-monitoring
 * @apiDescription 获取系统接线图历史值
 * @apiHeader {String} access-token 用户Token
 * @apiParam {Number} pointNumber 点号
 * @apiParam {string} startDate 开始时间
 * @apiParam {string} endDate 结束时间
 * @apiSampleRequest http://192.168.2.130:3001/on-line-monitoring/system-wiring/history
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/history', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const params = {
            ...req.query
        };
        const reply:any = await measurementsControllers.getMeasurements(req, params);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
export default router;