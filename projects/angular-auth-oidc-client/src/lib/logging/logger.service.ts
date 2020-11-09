import { Injectable } from '@angular/core';
import { ConfigurationProvider } from '../config/config.provider';
import { LogLevel } from './log-level';
import { LoggingAdapterService } from './logging.adapter.service';

@Injectable()
export class LoggerService {
  constructor( private configurationProvider: ConfigurationProvider, private logAdapter: LoggingAdapterService ) {
  }

  logError( message: any, ...args: any[] ) {
    this.logAdapter.logError(message, args);

    if (this.loggingIsTurnedOff()) {
      return;
    }

    args.length ? console.error(message, args) : console.error(message);
  }

  logWarning( message: any, ...args: string[] ) {
    this.logAdapter.logWarning(message, args);

    if (!this.logLevelIsSet()) {
      return;
    }

    if (this.loggingIsTurnedOff()) {
      return;
    }

    if (!this.currentLogLevelIsEqualOrSmallerThan(LogLevel.Warn)) {
      return;
    }

    args.length ? console.warn(message, args) : console.warn(message);
  }

  logDebug( message: any, ...args: string[] ) {
    this.logAdapter.logDebug(message, args);

    if (!this.logLevelIsSet()) {
      return;
    }

    if (this.loggingIsTurnedOff()) {
      return;
    }

    if (!this.currentLogLevelIsEqualOrSmallerThan(LogLevel.Debug)) {
      return;
    }

    args.length ? console.log(message, args) : console.log(message);
  }

  private currentLogLevelIsEqualOrSmallerThan( logLevel: LogLevel ) {
    if (this.logLevelIsSet()) {
      return this.configurationProvider.openIDConfiguration.logLevel <= logLevel;
    }

    return true;
  }

  private logLevelIsSet() {
    return !!this.configurationProvider.openIDConfiguration?.logLevel;
  }

  private loggingIsTurnedOff() {
    return this.configurationProvider.openIDConfiguration?.logLevel === LogLevel.None;
  }
}
