
import * as requestHandler from '../../public/handler/request_handler';
import { IRequest, IResponse } from 'src/types/globals';


export function loginWithoutValidation(req: IRequest) {
    const params = { ...req.body };
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['login'], params);
    return requestHandler.requestPromise(req, 'GET', url);
}