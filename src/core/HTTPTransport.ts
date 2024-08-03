const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

type HTTPTransportOptions = {
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  method?: string;
};

export default class HTTPTransport {
  get = (url: string, options: HTTPTransportOptions = {}, timeout: number) => {
    return this.request(url, { ...options, method: METHODS.GET }, timeout);
  };

  post = (url: string, options: HTTPTransportOptions = {}, timeout: number) => {
    return this.request(url, { ...options, method: METHODS.POST }, timeout);
  };

  put = (url: string, options: HTTPTransportOptions = {}, timeout: number) => {
    return this.request(url, { ...options, method: METHODS.PUT }, timeout);
  };

  delete = (
    url: string,
    options: HTTPTransportOptions = {},
    timeout: number
  ) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, timeout);
  };

  request = (
    url: string,
    options: HTTPTransportOptions = {},
    timeout: number = 5000
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
