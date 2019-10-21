import {NextFunction, Router} from "express";
import {IRequest, IResponse} from "../../types/globals";
import * as requestHandler from "../../public/handler/request_handler";
import * as QRcodeControllers from "../../controllers/QR_code/QR_codeControllers";

const router = Router();
/**
 * @api {get} /login/QR_code APP下载二维码
 * @apiVersion 0.0.0
 * @apiGroup App
 * @apiDescription 获取APP下载二维码
 * @apiHeader {String} access-token 用户Token
 * @apiSampleRequest http://192.168.2.130:3001/login
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.get('/', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply:any = await QRcodeControllers.getQRcode(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});
export default router;