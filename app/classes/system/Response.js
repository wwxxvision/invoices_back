class Response {
  constructor() {
    this.signature = '[Server message]:';
  }

  ok(body, message) {
    return {...body, status: true, message: this.signature + ' ' + message};
  }

  negative(message, code) {
    return {status: false, message: this.signature + ' ' + message, code};
  }
}

module.exports = new Response;
