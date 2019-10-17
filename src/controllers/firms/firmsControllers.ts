import * as requestHandler from '../../public/handler/request_handler';
import * as baseHandler from '../../public/handler/base_handler';
import { IRequest, IResponse } from 'src/types/globals';
import { NextFunction } from 'express';

export interface IFirmsController {
    getFirms: (req: IRequest) => Promise<void>;
}

export function getFirms(req: IRequest,id: string) {
    const url = requestHandler.urlGenerator(req._apiBaseUrl, ['firms', id]);
    return requestHandler.requestPromise(req, 'GET', url);
}