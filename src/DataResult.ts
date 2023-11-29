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
   * Returns the original array of results.
   *
   * @returns {IResult[]} The original array of results.
   * @since 1.0.0
   */
  public get(): IResult[] {
    return this.results;
  }

  /**
   * Returns the fastest benchmark result.
   *
   * @returns {IResult} The fastest algorithm.
   * @since 1.0.0
   */
  public fastest(): IResult {
    return this.results[0];
  }

  /**
   * Returns an array of benchmark results sorted from fastest to slowest.
   *
   * @returns {IResult[]} The array of algorithms sorted from fastest to slowest.
   * @since 1.0.0
   */
  public fastestToSlowest(): IResult[] {
    return this.sortedResults;
  }

  /**
   *  Returns the slowest benchmark result.
   *
   * @returns {IResult} The slowest algorithm.
   * @since 1.0.0
   */
  public slowest(): IResult {
    return this.sortedResults[this.sortedResults.length - 1];
  }

  /**
   * Returns an array of benchmark results sorted from slowest to fastest.
   *
   * @returns {IResult[]} The array of algorithms sorted from slowest to fastest.
   * @since 1.0.0
   */
  public slowestToFastest(): IResult[] {
    return [...this.sortedResults].reverse();
  }

  private sortResults(): void {
    this.sortedResults =  [...this.results].sort((a, b) => parseFloat(a.average) - parseFloat(b.average));
  }
}
