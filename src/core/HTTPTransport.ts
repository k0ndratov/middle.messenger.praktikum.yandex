import { BASE_URL } from "./constants/baseURL.ts";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

function queryStringify(data: Record<string, unknown>) {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`, "?");
}

type HTTPTransportOptions = {
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  method?: string;
};

export default class HTTPTransport {
  private _endpoint: string;

  constructor(endpont: string) {
    this._endpoint = `${BASE_URL}${endpont}`;
  }

  get = (path: string, options: HTTPTransportOptions = {}, timeout?: number) => this.request(this._endpoint + path, { ...options, method: METHODS.GET }, timeout);

  post = (path: string, options: HTTPTransportOptions = {}, timeout?: number) => this.request(this._endpoint + path, { ...options, method: METHODS.POST }, timeout);

  put = (path: string, options: HTTPTransportOptions = {}, timeout?: number) => this.request(this._endpoint + path, { ...options, method: METHODS.PUT }, timeout);

  delete = (path: string, options: HTTPTransportOptions = {}, timeout?: number) => this.request(this._endpoint + path, { ...options, method: METHODS.DELETE }, timeout);

  request = (url: string, options: HTTPTransportOptions = {}, timeout: number = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.responseType = "json";

      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data as Record<string, unknown>)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        const isStatusCodeSuccess = xhr.status >= 200 && xhr.status < 300;

        if (isStatusCodeSuccess) {
          resolve(xhr.response);
        } else {
          const hasReason = xhr.response.reason;
          const errorExplanation = hasReason || "Unexpected error";

          const errorMessage = `Request failed with status code: ${xhr.status}, ${errorExplanation}.`;

          reject(new Error(errorMessage));
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
