import faker from 'faker';
import apiError from './error';

class That {
  constructor() {
    this._data = {};
  }

  succeeded(data = {}) {
    this._ok = true;
    this._status = 200;
    this._data = data;
    this._errors = [];
    this._message = null;
    return this;
  }

  failed() {
    this._ok = false;
    this._status = 402;
    this._errors = [];
    this._message = faker.random.words();
    return this;
  }

  errored(message) {
    this._ok = false;
    this._status = 400;
    this._errors = [apiError.build()];
    this._message = message || faker.random.words();
    return this;
  }

  isUnauthorized() {
    this._ok = false;
    this._status = 401;
    this._errors = {};
    return this;
  }

  isRedirected() {
    this._ok = false;
    this._status = 301;
    this._errors = {};
    return this;
  }

  hasNoContent() {
    this._ok = true;
    this._status = 204;
    this._errors = {};
    return this;
  }

  build() {
    return {
      status: this._status,
      ok: this._ok,
      data: this._ok ? this._data : this._errors,
    };
  }
}

class Response {
  constructor() {
    this.that = new That(this);
  }
}

export default new Response();
