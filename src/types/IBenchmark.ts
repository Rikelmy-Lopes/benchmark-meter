import { IFunction } from '.';
import { IDataResult } from './IDataResult';

export interface IBenchmark {
    add(name: string, fn: IFunction, repeat?: number | undefined): void
    run(): Promise<IDataResult>
    clearResults(): void
    clearTests(): void
}