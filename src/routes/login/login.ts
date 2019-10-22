import {NextFunction, Router} from "express";
import {IRequest, IResponse} from "../../types/globals";
import * as requestHandler from "../../public/handler/request_handler";
import * as baseHandler from "../../public/handler/base_handler";
import * as loginControllers from "../../controllers/login/loginControllers";
import * as firmsControllers from "../../controllers/firms/firmsControllers";

const router = Router();
/**
 * @api {post} /login 登录
 * @apiVersion 0.0.0
 * @apiGroup Login
 * @apiDescription 登录
 * @apiParam {String} name 用户名.
 * @apiParam {String} password 密码.
 * @apiSampleRequest http://192.168.2.130:3001/login
 * @apiSuccessExample {json} Success-Response:
 { "content": "This is an example content" }
 */
router.post('/', async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        let loginParams={...req.body};
        const loginReply:any = await loginControllers.loginWithoutValidation(req, loginParams);
        const content = {
            name: loginReply.results.name,
            userId: loginReply.results.id.toString(),
            title: loginReply.results.title,
            firmId: loginReply.results.firm.id
        };
        // 前端id属性冲突,将id改成userId
        loginReply.results.userId = loginReply.results.id;

        // 删除一些敏感属性
        delete loginReply.results.id;
        delete loginReply.results.password;
        delete loginReply.results.phone;

        // 生成token信息
        loginReply.token = baseHandler.createToken(content);
        const arr = loginReply.token.split('.');
        const key = loginReply.results.userId + loginReply.results.name + arr[arr.length - 1];
        const loginTokenParams = {
            key: key,
            value: loginReply.token
        };
        await loginControllers.loginToken(req, loginTokenParams);
        if (loginReply.results.homePage) {
            return Promise.reject(loginReply);
        }else {
            const getFirmsReply:any = await firmsControllers.getFirms(req, loginReply.results.firm.id.toString());
            if (getFirmsReply.results.homePage) {
                loginReply.results.homePage = getFirmsReply.results.homePage;
            }
        }
        requestHandler.responseHandle(res, loginReply);
    } catch (e) {
        next(e);
    }
});

export default router;