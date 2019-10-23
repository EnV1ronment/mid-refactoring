import {Request} from 'express'
type ownReq = Omit<Request, 'body'| 'query'|'params' >
type ownRes<T> = {errorCode:number, results:T, errorMsg:string}
