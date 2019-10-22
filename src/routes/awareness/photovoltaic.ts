import {NextFunction, Router} from "express";
import {IRequest, IResponse} from "../../types/globals";
import * as requestHandler from "../../public/handler/request_handler";
import * as QRcodeControllers from "../../controllers/QR_code/QR_codeControllers";

const router = Router();
/**
 * @api {get} /awareness/photovoltaic/curve 光伏发电功率曲线
 * @apiVersion 0.0.0
 * @apiGroup Situational awareness
 * @apiDescription 获取光伏发电功率曲线
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.86:3001/awareness/photovoltaic/curve
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/curve', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});

export default router;