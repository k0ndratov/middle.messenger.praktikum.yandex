import HTTPTransport from "../HTTPTransport";

describe("HTTPTransport", () => {
  let http: HTTPTransport;
  let xhrMock: Partial<XMLHttpRequest>;

  const createHTTP = (endpont: string) => {
    http = new HTTPTransport(endpont);
    xhrMock = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      response: "Hello World!",
    };

    jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock as XMLHttpRequest);
  };

  it("should create a new HTTPTransport", () => {
    createHTTP("/mail");

    const instanceofHTTPTransport = http instanceof HTTPTransport;
    expect(instanceofHTTPTransport).toBe(true);
  });

  it("should not set header for requests without body", () => {
    createHTTP("/mail");

    http.post("/message");

    expect(xhrMock.setRequestHeader).not.toHaveBeenCalled();
  });

  it("should set header for requests with body", async () => {
    createHTTP("/mail");

    http.post("/message", { data: { userId: 32 } });

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith("Content-type", "application/json");
  });

  it("should send get request with param", async () => {
    createHTTP("/mail");

    http.get("/something", { data: { string: "param" } });

    expect(xhrMock.open).toHaveBeenCalledWith("GET", "https://ya-praktikum.tech/api/v2/mail/something?string=param");
  });

  it("should send post request with body", async () => {
    createHTTP("/mail");

    http.post("/message", { data: { userId: 32 } });

    expect(xhrMock.open).toHaveBeenCalledWith("POST", "https://ya-praktikum.tech/api/v2/mail/message");
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify({ userId: 32 }));
  });

  it("should send post request with formdata body", async () => {
    createHTTP("/mail");

    const formData = new FormData();
    formData.append("propName", "propValue");
    http.post("/message", { data: formData });

    expect(xhrMock.send).toHaveBeenCalledWith(formData);
  });
});
