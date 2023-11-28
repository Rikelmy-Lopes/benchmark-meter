import { InvalidValueException } from '../exceptions';
import { IBenchmarkOptions } from '../types';
import { defaultConfig } from './config';

export class ConfigHandler {

  public static parse(options: IBenchmarkOptions | undefined): IBenchmarkOptions {
    if (typeof options === 'object') {
      ConfigHandler.validateType(options);
      ConfigHandler.validateValue(options);
      return {
        repeat: options.repeat ?? defaultConfig.repeat,
      };
    } else {
      return defaultConfig;
    }
  }

  private static validateType({ repeat }: IBenchmarkOptions) {
    if (repeat !== undefined && typeof repeat !== 'number') {
      throw new TypeError(`Repeat must be a number. Received: ${typeof repeat}`);
    }
  }

  private static validateValue({ repeat }: IBenchmarkOptions) {
    if (repeat !== undefined && repeat <= 0) {
      throw new InvalidValueException('Repeat must be bigger than 0');
    }
  }
}