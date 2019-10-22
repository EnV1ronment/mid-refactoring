import * as requestHandler from '../../public/handler/request_handler';
import { IRequest, IResponse } from 'src/types/globals';

export function getRunStrategies(req: IRequest, _params:any) {
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['runStrategies'], _params);
    return requestHandler.requestPromise(req, 'GET', url);
}