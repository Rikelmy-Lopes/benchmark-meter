
export class DuplicateNameException extends Error {
  constructor(name: string) {
    super(`Test with the name "${name}" already exists.`);
    this.name = 'DuplicateNameException';
  }
}
  
export class InvalidRepeatException extends Error {
  constructor() {
    super('Invalid option for repeat. It must be a number greater than 0.');
    this.name = 'InvalidRepeatException';
  }
}
  
export class NoTestsAddedException extends Error {
  constructor() {
    super('At least one test must be added.');
    this.name = 'NoTestsAddedException';
  }
}
  