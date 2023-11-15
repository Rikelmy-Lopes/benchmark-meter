import { InvalidValueException } from '../exceptions';
import { IOptions } from '../types';
import { defaultConfig } from './config';

export class ConfigHandler {

  public static parse(options: IOptions | undefined): IOptions {
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

  private static validateType({ repeat }: IOptions) {
    if (repeat !== undefined && typeof repeat !== 'number') {
      throw new TypeError(`Repeat must be a number. Received: ${typeof repeat}`);
    }
  }

  private static validateValue({ repeat }: IOptions) {
    if (repeat !== undefined && repeat <= 0) {
      throw new InvalidValueException('Repeat must be bigger than 0');
    }
  }
}