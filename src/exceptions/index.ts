
export class DuplicateNameException extends Error {
  constructor(name: string) {
    super(`Test with the name "${name}" already exists.`);
    this.name = 'DuplicateNameException';
  }
}
  
export class InvalidValueException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidValueException';
  }
}
  
export class NoTestsAddedException extends Error {
  constructor() {
    super('At least one test must be added.');
    this.name = 'NoTestsAddedException';
  }
}
  