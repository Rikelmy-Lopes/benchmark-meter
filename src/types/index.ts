
export type IFunction = () => unknown;

export type ITypes = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'function';

export interface ITest {
    name: string;
    fn: IFunction;
    repeat: number;
}

/**
 * Represents the result of a performance measurement for a specific test.
 *
 * @interface IResult
 */
export interface IResult {
    /**
     * The name of the test.
     *
     * @type {string}
     */
    name: string;
  
    /**
     * The average duration of the test in a human-readable format.
     *
     * @type {string}
     */
    average: string;
  
    /**
     * The duration of the fastest execution of the test in a human-readable format.
     *
     * @type {string}
     */
    fastest: string;
  
    /**
     * The duration of the slowest execution of the test in a human-readable format.
     *
     * @type {string}
     */
    slowest: string;
  }
  


/**
 * Options for configuring the Algorithm execution.
 *
 * @interface IOptions
 */
export interface IOptions {
    /**
     * The number of times the algorithm will be executed.
     *
     * @remarks
     * This value determines how many times the algorithm or function will be repeated for accurate performance measurement.
     * @default 10

     * @type {number}
     */
    repeat?: number;
  }