export function prepareUrl(url, params) {
  if (!params) {
    return url;
  }

  const questionIndex = url.indexOf('?');
  let paramsStr = '';

  if (questionIndex === -1) {
    paramsStr += '?';
  }

  paramsStr += Object.keys(params)
    .map(key => {
      if (params[key]) {
        return `${key}=${encodeURIComponent(params[key])}`;
      }

      return null;
    })
    .filter(item => item)
    .join('&');

  return url + paramsStr;
}
