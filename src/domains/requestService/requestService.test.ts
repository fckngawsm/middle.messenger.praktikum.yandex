import { expect } from "chai";
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { METHOD } from "./constants";
import { RequestService } from "./requestService";

describe("testing RequestService", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: RequestService;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // Без этого не работает
    Object.assign(xhr, {
      UNSENT: 0,
      OPENED: 1,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      DONE: 4,
    });

    global.XMLHttpRequest = xhr as unknown as typeof XMLHttpRequest;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new RequestService("auth");
  });

  afterEach(() => {
    requests.length = 0;
  });

  it("should send GET request", () => {
    instance.get("user", {});

    const [request] = requests;

    expect(request?.method).to.eq("GET");
    expect(request?.url).to.eq("https://ya-praktikum.tech/api/v2/auth/user");
  });

  it("should send POST request", () => {
    instance.request("user", {
      method: METHOD.POST,
      data: {
        name: "John",
        age: 30,
      },
    });

    const [request] = requests;

    expect(request?.method).to.eq("POST");
    expect(request?.requestBody).to.not.eq('{"name":"John","age":31}');
    expect(request?.requestBody).to.eq('{"name":"John","age":30}');
  });
});
