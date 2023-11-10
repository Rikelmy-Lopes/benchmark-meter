import { DataResult } from './DataResult';
import { IFunction, ITest, IOptions, IResult } from './types';
import { performance, PerformanceObserver } from 'perf_hooks';
import { IDataResult } from './types/IDataResult';
import { IBenchmark } from './types/IBenchmark';


/**
 * Represents a benchmarking utility for measuring the performance of algorithms.
 */
export class Benchmark implements IBenchmark {
  private tests: ITest[] = [];
  private results: IResult[] = [];
  private repeat: number;
  private perfObserver: PerformanceObserver | undefined;

  /**
   * Creates an instance of Benchmark.
   *
   * @param {IOptions} options - The options for configuring the benchmark.
   * @throws Will throw an error if the repeat count is not greater than 0.
   */
  constructor(options: IOptions = {}) {
    if (options.repeat !== undefined && options.repeat <= 0) {
      throw new Error('Repeat must be greater than 0');
    }

    this.repeat = options.repeat ?? 10;
    this.initializePerformanceObserver();
  }

  /**
   * Adds a test to the benchmark.
   *
   * @param {string} name - The name of the test.
   * @param {IFunction} fn - The callback function with the algorithm to be benchmarked.
   * @param {number | undefined} repeat - The number of times to repeat the test (optional).
   * @throws Will throw an error if the test name is already used or if the repeat count is not greater than 0.
   */
  public add(name: string, fn: IFunction, repeat?: number | undefined): void {
    if (this.isNameAlreadyUsed(name)) {
      throw new Error(`Test with name "${name}" already exists`);
    }

    if (repeat !== undefined && repeat <= 0) {
      throw new Error('Repeat must be greater than 0');
    }

    this.tests.push({
      name,
      fn,
      repeat: repeat ?? this.repeat
    });
  }

  /**
   * Runs all added tests and returns the results as a DataResult instance.
   *
   * @returns {Promise<DataResult>} A promise that resolves to a DataResult instance.
   * @throws Will throw an error if no tests have been added.
   */
  public async run(): Promise<IDataResult> {
    if (this.tests.length === 0) {
      throw new Error('At least one test must be added');
    }

    for (const { name, fn, repeat } of this.tests) {
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
   * Clears the tests array.
   */
  public clearTests(): void {
    this.tests = [];
  }

  private async executeNTimes(name: string, fn: IFunction, repeat: number): Promise<void> {
    for (let i = 0; i < repeat; i += 1) {
      performance.mark('start');
      await fn();
      performance.mark('end');
      performance.measure(name, 'start', 'end');
    }
    this.calculateResults(performance.getEntriesByType('measure'), name, repeat);
    performance.clearMeasures();
  }

  private initializePerformanceObserver(): void {
    this.perfObserver = new PerformanceObserver(() => undefined);

    this.perfObserver.observe({ entryTypes: ['measure'], buffered: true });
  }

  private calculateResults(perfEntries: PerformanceEntry[], name: string, repeat: number): void {
    const totalDuration = perfEntries.reduce((acc, entry) => acc + entry.duration, 0);
    const averageDuration = totalDuration / repeat;
    const sortedPerfEntries = perfEntries.sort((a, b) => a.duration - b.duration);

    this.results.push({
      name,
      average: `${averageDuration.toFixed(2)}ms`,
      fastest: `${sortedPerfEntries[0].duration.toFixed(2)}ms`,
      slowest: `${sortedPerfEntries[sortedPerfEntries.length - 1].duration.toFixed(2)}ms`
    });
  }

  private isNameAlreadyUsed(name: string): boolean {
    return this.tests.some((test) => test.name === name);
  }
}
