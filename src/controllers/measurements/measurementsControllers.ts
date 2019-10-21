import * as requestHandler from '../../public/handler/request_handler';
import { IRequest, IResponse } from 'src/types/globals';
import {dateSplicing} from "../../public/handler/time_handler";

export function getMeasurements(req: IRequest, params:any) {
    const dtime = dateSplicing(params.startDate,params.endDate);
    const _params = {pointNumber: params.pointNumber, dtime};
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['measurements'], _params);
    return requestHandler.requestPromise(req, 'GET', url);
}

export function getMeasurementsBatch(req: IRequest, params:any) {
    const dtime = dateSplicing(params.startDate,params.endDate);
    const _params = {pointNumbers: params.pointNumbers, dtime};
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['measurements', 'batch'], _params);
    return requestHandler.requestPromise(req, 'GET', url);
}

export function getMeasurementsRealtime(req: IRequest, params:any) {
    const _params = {pointNumber: params.pointNumber};
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['measurements', 'realtime'], _params);
    return requestHandler.requestPromise(req, 'GET', url);
}

export function getMeasurementsByTimeRange(req: IRequest, params:any) {
    const dtime = dateSplicing(params.startDate, params.endDate);
    const _params = {pointNumber: params.pointNumber, dtime};
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['measurements', 'byTimeRange'], _params);
    return requestHandler.requestPromise(req, 'GET', url);
}