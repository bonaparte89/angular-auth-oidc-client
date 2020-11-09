import {Injectable} from '@angular/core';

@Injectable()
export abstract class LoggingAdapterService {

  public abstract logError(message: any, ...args: any[]): void;

  public abstract logWarning(message: any, ...args: any[]): void;

  public abstract logDebug(message: any, ...args: any[]): void;
}
