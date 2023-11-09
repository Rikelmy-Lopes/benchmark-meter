import { IFunction, IFunctionObject, IOptions, IResult } from './types';
import { performance, PerformanceObserver } from 'perf_hooks';

// add longest duration
// add lowest duration
// add fastest function
// add slowest function

export class Benchmark {
  private tests: IFunctionObject[] = [];
  private results: IResult[] = [];
  private repeatCount: number;
  private perfObserver: PerformanceObserver;
  
  constructor(options: IOptions) {
    if (options.repeatCount && options.repeatCount <= 0) {
      throw new Error('Repeat param must be bigger than 0');
    }
    
    this.repeatCount = options.repeatCount || 10;
    this.initializePerformanceObserver();
  }

  public add(name: string, fn: IFunction, repeatCount?: number | undefined ): void {
    if (this.isNameAlreadyUsed(name)) {
      throw new Error(`The same name cannot be set twice: ${name}`);
    }

    if (repeatCount && repeatCount <= 0) {
      throw new Error('Repeat param must be bigger than 0');
    }

    this.tests.push({
      name,
      fn,
      repeat: repeatCount || this.repeatCount
    });
  }

  public run(): IResult[] {
    this.tests.forEach(({ name, fn, repeat }) => {
      this.executeNTimes(name, fn, repeat);
    });

    return this.results;
  }

  public clearResults(): void {
    this.results = [];
  }

  public clearTests(): void {
    this.tests = [];
  }

  private executeNTimes(name: string, fn: IFunction, repeat: number): void {
    for (let i = 0; i < repeat; i += 1) {
      performance.mark('start');
      fn();
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

  private calculateResults(perfEntries: PerformanceEntry[], name: string , repeat: number): void {
    const totalDuration = perfEntries.reduce((acc, entry) => acc + entry.duration, 0);
    const averageDuration = totalDuration / repeat;
    
    const result = averageDuration < 1 ? averageDuration.toFixed(4) : Math.round(averageDuration);
    this.results.push({
      name,
      average: `${result} ms`
    });
  }

  private isNameAlreadyUsed(name: string): boolean {
    return this.tests.map(({ name }) => name)
      .some((n) => n === name);
  }
  
}
