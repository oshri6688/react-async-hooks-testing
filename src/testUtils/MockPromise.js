import { act } from "react-dom/test-utils";

const createMockCallback = callback => (...args) => {
  let result;

  if (!callback) {
    return;
  }

  act(() => {
    result = callback(...args);
  });

  return result;
};

export default class MockPromise {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
  }

  resolve(...args) {
    this.promiseResolve(...args);

    return this;
  }

  reject(...args) {
    this.promiseReject(...args);

    return this;
  }

  then(...callbacks) {
    const mockCallbacks = callbacks.map(callback =>
      createMockCallback(callback)
    );

    this.promise = this.promise.then(...mockCallbacks);

    return this;
  }

  catch(callback) {
    const mockCallback = createMockCallback(callback);

    this.promise = this.promise.catch(mockCallback);

    return this;
  }

  finally(callback) {
    const mockCallback = createMockCallback(callback);

    this.promise = this.promise.finally(mockCallback);

    return this;
  }
}
