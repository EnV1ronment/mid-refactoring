
import * as requestHandler from '../../public/handler/request_handler';
import * as baseHandler from '../../public/handler/base_handler';
import { IRequest, IResponse } from 'src/types/globals';
import { NextFunction } from 'express';

export interface IStationController {
  getStations: (req: IRequest) => Promise<void>;
}

export function getStations(req: IRequest) {
  const params = { ...req.query, isNeedChildFirm: false };
  const url = requestHandler.urlGenerator(req._apiBaseUrl, ['stations'], params);
  return requestHandler.requestPromise(req, 'GET', url);
}