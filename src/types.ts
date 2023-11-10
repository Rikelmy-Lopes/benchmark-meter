
export type IFunction = () => unknown;

export interface IFunctionObject {
    name: string;
    fn: IFunction;
    repeat: number;
}

export interface IResult {
    name: string;
    average: string;
    fastest: string;
    slowest: string;
}

export interface IOptions {
    repeatCount?: number | undefined;
}