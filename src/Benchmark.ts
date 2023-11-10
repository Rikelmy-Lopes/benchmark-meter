import { DataResult } from './DataResult';
import { IFunction, ITest, IOptions, IResult } from './types';
import { performance, PerformanceObserver } from 'perf_hooks';


export class Benchmark {
  private tests: ITest[] = [];
  private results: IResult[] = [];
  private repeatCount: number;
  private perfObserver: PerformanceObserver | undefined;

  constructor(options: IOptions = {}) {
    if (options.repeatCount && options.repeatCount <= 0) {
      throw new Error('Repeat count must be greater than 0');
    }

    this.repeatCount = options.repeatCount || 10;
    this.initializePerformanceObserver();
  }

  public add(name: string, fn: IFunction, repeatCount?: number | undefined): void {
    if (this.isNameAlreadyUsed(name)) {
      throw new Error(`Test with name "${name}" already exists`);
    }

    if (repeatCount && repeatCount <= 0) {
      throw new Error('Repeat count must be greater than 0');
    }

    this.tests.push({
      name,
      fn,
      repeat: repeatCount || this.repeatCount
    });
  }

  public async run(): Promise<DataResult> {
    if (this.tests.length === 0) {
      throw new Error('At least one test must be added');
    }

    for (const { name, fn, repeat } of this.tests) {
      await this.executeNTimes(name, fn, repeat);
    }

    return new DataResult(this.results);
  }

  public clearResults(): void {
    this.results = [];
  }

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
