import HTTPTransport from "@/core/HTTPTransport";

export abstract class BaseAPI {
  public http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  abstract create?(data: unknown): Promise<unknown>;

  abstract request?(data: unknown): Promise<unknown>;

  abstract update?(data: unknown): Promise<unknown>;

  abstract delete?(data: unknown): Promise<unknown>;
}
