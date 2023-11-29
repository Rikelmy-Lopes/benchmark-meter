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

  public static validateType({ repeat }: IBenchmarkOptions) {
    if (repeat !== undefined && typeof repeat !== 'number') {
      throw new TypeError(`repeat must be a number. Received: ${typeof repeat}`);
    }
  }

  public static validateValue({ repeat }: IBenchmarkOptions) {
    if (repeat !== undefined && repeat < 1) {
      throw new InvalidValueException('repeat must be bigger than 0');
    }
  }
}