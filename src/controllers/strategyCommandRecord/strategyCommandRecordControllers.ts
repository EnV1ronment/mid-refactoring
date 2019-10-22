import * as requestHandler from '../../public/handler/request_handler';
import { IRequest, IResponse } from 'src/types/globals';
import {dateSplicing} from "../../public/handler/time_handler";

export function getStrategyCommandRecord(req: IRequest, _params:any) {
    const dtime = dateSplicing(_params.startDate,_params.endDate);
    const params = {dtime, deviceId: _params.deviceId};
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['strategyCommandRecord'], params);
    return requestHandler.requestPromise(req, 'GET', url);
}