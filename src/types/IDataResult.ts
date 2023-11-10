import { IResult } from '.';

export interface IDataResult {
    get(): IResult[]
    fastest(): IResult
    slowest(): IResult
}