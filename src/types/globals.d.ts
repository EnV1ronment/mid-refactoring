import { Request, Response } from 'express';

export interface IRequest extends Request {
  [property: string]: any
}

export interface IResponse extends Response {
  [property: string]: any
}

export interface IError extends Error {
  [property: string]: any
}