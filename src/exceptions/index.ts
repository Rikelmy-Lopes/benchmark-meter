
export class DuplicateNameException extends Error {
  constructor(name: string) {
    super(`Algorithm with the name "${name}" already exists.`);
    this.name = 'DuplicateNameException';
  }
}
  
export class InvalidValueException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidValueException';
  }
}
  
export class NoAlgorithmsAddedException extends Error {
  constructor() {
    super('At least one algorithm must be added.');
    this.name = 'NoAlgorithmsAddedException';
  }
}
  