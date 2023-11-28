import { IResult } from './types';
import { IDataResult } from './types/IDataResult';

/**
 * Represents a data result implementation.
 *
 */
export class DataResult implements IDataResult {
  private results: IResult[];
  private sortedResults: IResult[] = [];

  /**
   * Creates an instance of DataResult.
   *
   * @param {IResult[]} results - The array of results to initialize the instance.
   */
  constructor(results: IResult[]) {
    this.results = results;
    this.sortResults();
  }

  /**
   * Gets the original array of results.
   *
   * @returns {IResult[]} The original array of results.
   */
  public get(): IResult[] {
    return this.results;
  }

  /**
   * Gets the fastest algorithm.
   *
   * @returns {IResult} The fastest algorithm.
   */
  public fastest(): IResult {
    return this.results[0];
  }

  /**
   * Gets the array of algorithms sorted from fastest to slowest.
   *
   * @returns {IResult[]} The array of algorithms sorted from fastest to slowest.
   */
  public fastestToSlowest(): IResult[] {
    return this.sortedResults;
  }

  /**
   * Gets the slowest algorithm.
   *
   * @returns {IResult} The slowest algorithm.
   */
  public slowest(): IResult {
    return this.sortedResults[this.sortedResults.length - 1];
  }

  /**
   * Gets the array of algorithms sorted from slowest to fastest.
   *
   * @returns {IResult[]} The array of algorithms sorted from slowest to fastest.
   */
  public slowestToFastest(): IResult[] {
    return [...this.sortedResults].reverse();
  }

  private sortResults(): void {
    this.sortedResults =  [...this.results].sort((a, b) => parseFloat(a.average) - parseFloat(b.average));
  }
}
