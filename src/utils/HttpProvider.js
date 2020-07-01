import { prepareUrl } from './helpers';

export class HttpProvider {
  static get(url, params) {
    const newUrl = prepareUrl(url, params);
    return HttpProvider.#send(newUrl, 'GET');
  }

  static post(url, data) {
    return HttpProvider.#send(url, 'POST', data);
  }

  static patch(url, data) {
    return HttpProvider.#send(url, 'PATCH', data);
  }

  static delete(url) {
    return HttpProvider.#send(url, 'DELETE');
  }

  static #send(url, method, data) {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
  }
}
