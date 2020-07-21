class Log {
  info(info, color, writeInLogger) {
    console.log(global.colors[color](info));

    if (writeInLogger) {
      global.logger.info(info);
    }
  }
}

module.exports = new Log;
