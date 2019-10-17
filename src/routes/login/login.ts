import {NextFunction, Router} from "express";
import {IRequest, IResponse} from "../../types/globals";
import * as requestHandler from "../../public/handler/request_handler";
import * as loginControllers from "../../controllers/login/loginControllers";

const router = Router();

/**
 * @api {get} /login 登入
 * @apiVersion 0.0.0
 * @apiGroup Login
 * @apiDescription 登入
 */
router.get('/', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        const reply = await loginControllers.loginWithoutValidation(req);
        requestHandler.responseHandle(res, reply);
    } catch (e) {
        next(e);
    }
});

export default router;