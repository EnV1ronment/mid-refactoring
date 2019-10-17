
import * as requestHandler from '../../public/handler/request_handler';
import { IRequest, IResponse } from 'src/types/globals';
interface Params{
    name: string,
    password: string
}
interface tokenParams{
    key: string,
    value: string
}
export function loginWithoutValidation(req: IRequest,params: Params) {
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['login'], params);
    return requestHandler.requestPromise(req, 'GET', url);
}

export function loginToken(req: IRequest,params: tokenParams) {
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['login', 'token'], params);
    return requestHandler.requestPromise(req, 'POST', url);
}