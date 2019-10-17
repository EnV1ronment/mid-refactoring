import * as requestHandler from '../../public/handler/request_handler';
import { IRequest, IResponse } from 'src/types/globals';

export function getQRcode(req: IRequest) {
    const params = {...req.query};
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['QRcode'], params);
    return requestHandler.requestPromise(req, 'GET', url);
}