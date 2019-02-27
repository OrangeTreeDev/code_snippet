const debug = require('debug');

class Logger {
  constructor() {
    const appName = 'app';
    this.info = debug(`${appName}:info`);
    this.debug = debug(`${appName}:debug`);
    this.warn = debug(`${appName}:warn`);
    this.error = debug(`${appName}:error`);
  }

  info(className, format, ...args) {
    this.info(`${className} ${format}`, ...args);
  }

  debug(className, format, ...args) {
    this.debug(`${className} ${format}`, ...args);
  }

  warn(className, format, ...args) {
    this.warn(`${className} ${format}`, ...args);
  }

  error(className, format, ...args) {
    this.error(`${className} ${format}`, ...args);
  }
}

const logger = new Logger();
module.exports = logger;