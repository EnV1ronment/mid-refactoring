import {NextFunction, Router} from "express";
import {IRequest, IResponse} from "../../types/globals";
import * as requestHandler from "../../public/handler/request_handler";
import * as baseHandler from "../../public/handler/base_handler";
import * as loginControllers from "../../controllers/login/loginControllers";
import * as firmsControllers from "../../controllers/firms/firmsControllers";
import * as QRcodeControllers from "../../controllers/QR_code/QR_codeControllers";

const router = Router();
/**
 * @api {get} /microgrid/overview/summary 汇总看板
 * @apiVersion 0.0.0
 * @apiGroup Microgrid-Overview
 * @apiDescription 获取汇总信息
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.130:3001/microgrid/overview/summary
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/summary', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
/**
 * @api {get} /microgrid/overview/safe/days 安全运行天数
 * @apiVersion 0.0.0
 * @apiGroup Microgrid-Overview
 * @apiDescription 获取安全运行天数信息
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.130:3001/microgrid/overview/safe/days
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/safe/days', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
/**
 * @api {get} /microgrid/overview/weather 天气信息接口
 * @apiVersion 0.0.0
 * @apiGroup Microgrid-Overview
 * @apiDescription 获取天气信息
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.130:3001/microgrid/overview/weather
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/weather', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});

/**
 * @api {get} /microgrid/overview/status 运行状态
 * @apiVersion 0.0.0
 * @apiGroup Microgrid-Overview
 * @apiDescription 获取运行状态信息
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.130:3001/microgrid/overview/status
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/status', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
/**
 * @api {get} /microgrid/overview/output/curve 出力曲线
 * @apiVersion 0.0.0
 * @apiGroup Microgrid-Overview
 * @apiDescription 获取出力曲线
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.130:3001/microgrid/overview/output/curve
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/output/curve', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
/**
 * @api {get} /microgrid/overview/details 运行详情
 * @apiVersion 0.0.0
 * @apiGroup Microgrid-Overview
 * @apiDescription 获取运行详情
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.130:3001/microgrid/overview/details
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/details', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
/**
 * @api {get} /microgrid/overview/abnormal  异常事件
 * @apiVersion 0.0.0
 * @apiGroup Microgrid-Overview
 * @apiDescription 获取异常事件
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.130:3001/microgrid/overview/abnormal
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/abnormal', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
export default router;