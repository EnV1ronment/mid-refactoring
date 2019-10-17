import { NextFunction } from 'express';
import { IRequest, IResponse } from '../../types/globals';
import * as requestHandler from '../handler/request_handler'

export function getHeaderData(req: IRequest, res: IResponse, next: NextFunction): void {
  req._apiBaseUrl = requestHandler.getApiBaseUrl();
  req._language = req.headers['language'] || 'zh';
  req._token = req.headers['access-token'];
  req._apiBaseUrl = req._apiBaseUrl + '/';
  next();
};
