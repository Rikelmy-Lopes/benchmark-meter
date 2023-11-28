import { IResult } from '.';


export interface IDataResult {
    get(): IResult[];
    fastest(): IResult;
    fastestToSlowest(): IResult[];
    slowest(): IResult;
    slowestToFastest(): IResult[]
}