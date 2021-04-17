import Config from 'react-native-config';
import { captureMessage, Severity, init } from '@sentry/react-native';
import { LogLevel } from '@sentry/types';

const initLogger = () => {
  if (process.env.NODE_ENV === 'production') {
    init({
      dsn: Config.SENTRY_DSN,
      logLevel: LogLevel.Debug,
      environment: process.env.NODE_ENV,
    });
  }
};

class Logger {
  static sendLocalError = (error: Error, message = '') => {
    if (__DEV__) {
      console.error(error, message);
    }
    return null;
  };

  static sendMessage = (message: string, level: Severity = Severity.Warning): void => {
    captureMessage(message, level);
  };
}

export { Logger, Severity, initLogger };
