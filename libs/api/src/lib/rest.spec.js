import 'regenerator-runtime/runtime';
import MockAdapter from 'axios-mock-adapter';
import { api, random } from '@park-plus/fake-data';

import { configureRest, parseResponse, get, post, put } from './rest';

import axios from 'axios';

describe('rest', () => {
  describe('when configuring', () => {
    describe('in general', () => {
      beforeAll(() => {
        configureRest();
      });

      test('should set default accept to json', () => {
        expect(axios.defaults.headers.common.accept)
          .toBe('application/json');
      });
    });
  });

  describe('when parsing a response', () => {
    describe('and response is 401 unauthorized', () => {
      test('should return a not okay response', async () => {
        const unauthorizedResponse = api.response.that.isUnauthorized().build();
        const parsed = await parseResponse(unauthorizedResponse);
        expect(parsed.ok).toBe(false);
      });
    });

    describe('and response is 301 redirected', () => {
      test('should return a not okay response', async () => {
        const redirectedResponse = api.response.that.isRedirected().build();
        const parsed = await parseResponse(redirectedResponse);
        expect(parsed.ok).toBe(false);
      });
    });

    describe('and response is successful but with no content', () => {
      const noContentResponse = api.response.that.hasNoContent().build();
      let parsed;

      beforeAll(async () => {
        parsed = await parseResponse(noContentResponse);
      });

      test('should return an okay response', () => {
        expect(parsed.ok).toBe(true);
      });

      test('should return empty json data', () => {
        expect(parsed.data).toEqual({});
      });
    });

    describe('and response is ok', () => {
      let expectedData;
      let parsed;

      beforeAll(async () => {
        expectedData = random.word();
        const okResponse = api.response.that.succeeded(expectedData).build();
        parsed = await parseResponse(okResponse);
      });

      test('should return a successful parsed response', () => {
        expect(parsed).toEqual({ ok: true, data: expectedData, status: 200 });
      });
    });

    describe('and response has failed', () => {
      let failedResponse;
      let parsed;

      beforeAll(async () => {
        failedResponse = api.response.that.failed().build();
        parsed = await parseResponse(failedResponse);
      });

      test('should return a failed parsed response', () => {
        expect(parsed).toEqual({ ok: false, errors: failedResponse.data, status: 402 });
      });
    });
  });

  describe('when requesting a get', () => {
    const expectedUrl = random.word();
    const expectedData = random.word();
    let response;
    let mock;

    beforeAll(async () => {
      const token = random.uuid();
      configureRest({getToken: async () => Promise.resolve(token)})
      mock = new MockAdapter(axios);
      mock
        .onGet(expectedUrl)
        .reply((config) => {
          if (config.headers.Authorization !== `Bearer ${token}`) return [401];
          return [200, expectedData];
        });
      response = await get(expectedUrl);
    });

    afterAll(() => {
      mock.restore();
    });

    test('should return the proper response', () => {
      expect(response).toEqual({ ok: true, data: expectedData, status: 200 });
    });
  });

  describe('when requesting a post', () => {
    describe('and request is successful', () => {
      const expectedUrl = random.word();
      const expectedBody = random.word();
      const expectedData = random.word();
      let response;
      let mock;

      beforeAll(async () => {
        const token = random.uuid();
        configureRest({getToken: async () => Promise.resolve(token)})
        mock = new MockAdapter(axios);
        mock
          .onPost(expectedUrl, expectedBody)
          .reply((config) => {
            if (config.headers.Authorization !== `Bearer ${token}`) return [401];
            return [201, expectedData];
          });
        response = await post(expectedUrl, { body: expectedBody });
      });

      afterAll(() => {
        mock.restore();
      });

      test('should return the proper response', () => {
        expect(response).toEqual({ ok: true, data: expectedData, status: 201 });
      });
    });

    describe('and request passes a raw body', () => {
      const expectedUrl = random.word();
      const expectedBody = { payload: random.word() };
      const expectedData = random.word();
      let response;
      let mock;

      beforeAll(async () => {
        const token = random.uuid();
        configureRest({ getToken: async () => Promise.resolve(token) });
        mock = new MockAdapter(axios);
        mock
          .onPost(expectedUrl, expectedBody)
          .reply((config) => {
            if (config.headers.Authorization !== `Bearer ${token}`) return [401];
            return [201, expectedData];
          });

        response = await post(expectedUrl, expectedBody);
      });

      afterAll(() => {
        mock.restore();
      });

      test('should return the proper response', () => {
        expect(response).toEqual({ ok: true, data: expectedData, status: 201 });
      });
    });

    describe('and request is failure', () => {
      const expectedUrl = random.word();
      const expectedBody = random.word();
      const expectedData = random.word();
      let response;
      let mock;

      beforeAll(async () => {
        mock = new MockAdapter(axios);
        mock.onPost(expectedUrl, expectedBody).reply(400, expectedData);
        response = await post(expectedUrl, { body: expectedBody });
      });

      afterAll(() => {
        mock.restore();
      });

      test('should return the proper response', () => {
        expect(response).toEqual({ ok: false, errors: [expectedData], status: 400 });
      });
    });
  });

  describe('when requesting a put', () => {
    describe('and request is successful', () => {
      const expectedUrl = random.word();
      const expectedBody = random.word();
      const expectedData = random.word();
      let response;
      let mock;

      beforeAll(async () => {
        const token = random.uuid();
        configureRest({getToken: async () => Promise.resolve(token)})
        mock = new MockAdapter(axios);
        mock
          .onPut(expectedUrl, expectedBody)
          .reply((config) => {
            if (config.headers.Authorization !== `Bearer ${token}`) return [401];
            return [200, expectedData];
          });
        response = await put(expectedUrl, { body: expectedBody });
      });

      afterAll(() => {
        mock.restore();
      });

      test('should return the proper response', () => {
        expect(response).toEqual({ ok: true, data: expectedData, status: 200 });
      });
    });

    describe('and request passes a raw body', () => {
      const expectedUrl = random.word();
      const expectedBody = { payload: random.word() };
      const expectedData = random.word();
      let response;
      let mock;

      beforeAll(async () => {
        const token = random.uuid();
        configureRest({ getToken: async () => Promise.resolve(token) });
        mock = new MockAdapter(axios);
        mock
          .onPut(expectedUrl, expectedBody)
          .reply((config) => {
            if (config.headers.Authorization !== `Bearer ${token}`) return [401];
            return [200, expectedData];
          });
        response = await put(expectedUrl, expectedBody);
      });

      afterAll(() => {
        mock.restore();
      });

      test('should return the proper response', () => {
        expect(response).toEqual({ ok: true, data: expectedData, status: 200 });
      });
    });

    describe('and request is failure', () => {
      const expectedUrl = random.word();
      const expectedBody = random.word();
      const expectedData = random.word();
      let response;
      let mock;

      beforeAll(async () => {
        mock = new MockAdapter(axios);
        mock.onPut(expectedUrl, expectedBody).reply(400, expectedData);
        response = await put(expectedUrl, { body: expectedBody });
      });

      afterAll(() => {
        mock.restore();
      });

      test('should return the proper response', () => {
        expect(response).toEqual({ ok: false, errors: [expectedData], status: 400 });
      });
    });
  });
});
