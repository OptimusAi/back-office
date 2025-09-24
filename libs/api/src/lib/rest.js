import axios from 'axios';

let opts = { baseUrl: '', getToken: null };

const normalizeOptions = (options) => {
  if (options === undefined) return {};

  const isPlainObject =
    options !== null && typeof options === 'object' && !Array.isArray(options);

  if (!isPlainObject) return { body: options };

  const recognizedKeys = ['body', 'baseUrl', 'getToken', 'params'];
  const hasRecognizedKey = recognizedKeys.some((key) => key in options);

  return hasRecognizedKey ? options : { body: options };
};

export const configureRest = (options) => {
  opts = { ...opts, ...options };
  axios.defaults.headers.common.accept = 'application/json';
};

const getConfig = async ({ baseUrl, params, getToken }) => {
  const config = { baseURL: baseUrl ?? opts.baseUrl, params };
  if (getToken || opts.getToken) {
    const token = await (getToken ?? opts.getToken)();
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
};

export const parseResponse = (response) => {
  if (response.status === 401)
    return { ok: false, errors: [{ message: 'unauthorized' }] };
  if (response.status === 204) return { ok: true, data: {} };

  const json = response.data;
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 202 ||
    response.status === 206
  )
    return { ok: true, data: json, status: response.status };

  if (response.status >= 400 || response.status <= 500) {
    return { ok: false, errors: Array.isArray(json) ? json : [json], status: response.status };
  }
  return { ok: true, data: json, status: response.status };
};

export const handleError = (err) => {
  return err.response
    ? parseResponse(err.response)
    : { ok: false, errors: [{ message: err.message }] };
};

export const get = (resource, { params, baseUrl, getToken } = {}) =>
  getConfig({ baseUrl, params, getToken })
    .then((config) => axios.get(resource, config))
    .then((res) => parseResponse(res))
    .catch((err) => handleError(err));

export const post = (resource, options) => {
  const { body, baseUrl, getToken, params } = normalizeOptions(options);
  return getConfig({ baseUrl, getToken, params })
    .then((config) => axios.post(resource, body, config))
    .then((res) => parseResponse(res))
    .catch((err) => handleError(err));
};

export const put = (resource, options) => {
  const { body, baseUrl, getToken, params } = normalizeOptions(options);
  return getConfig({ baseUrl, getToken, params })
    .then((config) => axios.put(resource, body, config))
    .then((res) => parseResponse(res))
    .catch((err) => handleError(err));
};

export const patch = (resource, options) => {
  const { body, baseUrl, getToken, params } = normalizeOptions(options);
  return getConfig({ baseUrl, getToken, params })
    .then((config) => axios.patch(resource, body, config))
    .then((res) => parseResponse(res))
    .catch((err) => handleError(err));
};

export const del = (resource, options) => {
  const { body, baseUrl, getToken, params } = normalizeOptions(options);
  return getConfig({ baseUrl, getToken, params })
    .then((config) => axios.delete(resource, { ...config, data: body }))
    .then((res) => parseResponse(res))
    .catch((err) => handleError(err));
};
