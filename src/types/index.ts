

export type ITypes = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'function';

export interface IAlgorithm {
    name: string;
    fn: () => unknown;
    repeat: number;
}

/**
 * Represents the result of a performance measurement for a specific algorithm.
 *
 * @interface IResult
 */
export interface IResult {
    /**
     * The name of the algorithm.
     *
     * @type {string}
     */
    name: string;
  
    /**
     * The average duration of the algorithm in a human-readable format.
     *
     * @type {string}
     */
    average: string;
  
    /**
     * The duration of the fastest execution of the algorithm in a human-readable format.
     *
     * @type {string}
     */
    fastest: string;
  
    /**
     * The duration of the slowest execution of the algorithm in a human-readable format.
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
     * This value determines how many times the algorithm will be repeated for accurate performance measurement.
     * @default 10

     * @type {number}
     */
    repeat?: number;
  }