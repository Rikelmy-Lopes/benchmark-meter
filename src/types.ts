
export type IFunction = () => unknown;

export interface IFunctionObject {
    name: string;
    fn: IFunction;
    repeat: number;
}

export interface IResult {
    name: string;
    average: string;
}

export interface IOptions {
    repeatCount?: number | undefined;
}