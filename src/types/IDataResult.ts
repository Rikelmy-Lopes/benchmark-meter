import { IResult } from '.';

/**
 * Interface representing the results of the benchmarks.
 * @interface IDataResult
 */
export interface IDataResult {
    /**
     * Returns the original array of results.
     * 
     * @returns {IResult[]} The original array of results.
     */
    get(): IResult[];

    /**
     * Returns the fastest benchmark result.
     * 
     * @returns {IResult} The fastest algorithm.
     */
    fastest(): IResult;

    /**
     * Returns an array of benchmark results sorted from fastest to slowest.
     * 
     * @returns {IResult[]} The array of algorithms sorted from fastest to slowest.
     */
    fastestToSlowest(): IResult[];

    /**
     * Returns the slowest benchmark result.
     * 
     * @returns {IResult} The slowest algorithm.
     */
    slowest(): IResult;

    /**
     * Returns an array of benchmark results sorted from slowest to fastest.
     * 
     * @returns {IResult[]} The array of algorithms sorted from slowest to fastest.
     */
    slowestToFastest(): IResult[];
}
