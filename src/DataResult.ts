import { IResult } from './types';
import { IDataResult } from './types/IDataResult';


export class DataResult implements IDataResult {
  private results: IResult[];

  constructor(results: IResult[]) {
    this.results = results;
  }

  public get() {
    return this.results;
  }

  public fastest(): IResult {
    if (this.results.length === 1) {
      return this.results[0];
    }
    return this.sortResults()[0];
  }

  public slowest(): IResult {
    if (this.results.length === 1) {
      return this.results[0];
    }
    return this.sortResults()[this.results.length -1];
  }

  private sortResults(): IResult[] {
    return [...this.results].sort((a, b) => parseFloat(a.average) - parseFloat(b.average));
  }
}
