import { DataResult } from './DataResult';
import { IAlgorithmBody, IBenchmarkOptions, IResult } from './types';
import { performance } from 'node:perf_hooks';
import { DuplicateNameException, NoAlgorithmsAddedException } from './exceptions';
import { ConfigHandler } from './config/ConfigHandler';


/**
 * Represents a benchmarking utility for measuring the performance of algorithms.
 */
export class Benchmark {
  private algorithms: IAlgorithmBody[] = [];
  private results: IResult[] = [];
  private options: IBenchmarkOptions;

  /**
   * Creates an instance of Benchmark.
   *
   * @param {IOptions} options - The options for configuring the benchmark.
   */
  constructor(options: IBenchmarkOptions = {}) {
    this.options = ConfigHandler.parse(options);
  }

  /**
   * Adds a algorithm to the Benchmark.
   *
   * @param {string} name - The name of the algorithm.
   * @param {IFunction} fn - The callback function with the algorithm to be benchmarked.
   * @param {number | undefined} repeat - The number of times to repeat the algorithm (optional).
   * @throws Will throw an error if the algorithm name is already used or if the repeat count is not greater than 0.
   */
  public add(name: string, fn: () => unknown, repeat?: number | undefined): void {
    if (this.isNameAlreadyUsed(name)) {
      throw new DuplicateNameException(name);
    }

    this.algorithms.push({
      name,
      fn,
      repeat: repeat ?? this.options.repeat as number,
    });
  }

  /**
   * Runs all added algorithms and returns the results as a DataResult instance.
   *
   * @returns {Promise<DataResult>} A promise that resolves to a DataResult instance.
   * @throws Will throw an error if no algorithms have been added.
   */
  public async run(): Promise<DataResult> {
    if (this.algorithms.length === 0) {
      throw new NoAlgorithmsAddedException();
    }

    for (const { name, fn, repeat } of this.algorithms) {
      await this.executeNTimes(name, fn, repeat);
    }
    
    return new DataResult(this.results);
  }

  /**
   * Clears the results array.
   */
  public clearResults(): void {
    this.results = [];
  }

  /**
   * Clears the algorithm array.
   */
  public clearAlgorithms(): void {
    this.algorithms = [];
  }

  private async executeNTimes(name: string, fn: () => unknown, repeat: number): Promise<void> {
    const durations = [];
    for (let i = 0; i < repeat; i += 1) {
      performance.mark('benchmark-start');
      await fn();
      performance.mark('benchmark-end');
      const measure = performance.measure(name, 'benchmark-start', 'benchmark-end');
      durations.push(measure.duration);
    }
    this.calculateResults(durations, name, repeat);
  }

  private calculateResults(durations: number[], name: string, repeat: number): void {
    const totalDuration = durations.reduce((acc, duration) => acc + duration, 0);
    const averageDuration = totalDuration / repeat;
    const sortedDurations = durations.sort((a, b) => a - b);

    this.results.push({
      name,
      average: `${averageDuration.toFixed(2)}ms`,
      fastest: `${sortedDurations[0].toFixed(2)}ms`,
      slowest: `${sortedDurations[sortedDurations.length - 1].toFixed(2)}ms`
    });
  }

  private isNameAlreadyUsed(name: string): boolean {
    return this.algorithms.some((algorithm) => algorithm.name === name);
  }
}
