import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { isFunction } from "lodash";
import MockPromise from "testUtils/MockPromise";
import { useFetchData } from "./customHook";
import { getData } from "services/dataService";

jest.mock("services/dataService", () => ({
  getData: jest.fn(),
}));

const Hook = () => <div />;

const HookWrapper = ({ hook }) => {
  const hookState = isFunction(hook) ? hook() : hook;
  return <Hook hook={hookState} />;
};

const getHook = wrapper => {
  wrapper.update();

  return wrapper.find(Hook).prop("hook");
};

const data = ["test"];

let getDataPromise;

getData.mockImplementation(() => {
  getDataPromise = new MockPromise();

  return getDataPromise;
});

describe("useFetchData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("when fetching data successed", async () => {
    const wrapper = mount(<HookWrapper hook={useFetchData} />);

    let hook = getHook(wrapper);

    expect(hook.data).toEqual([]);
    expect(hook.isLoading).toBe(true);
    expect(hook.fetchData).toBeInstanceOf(Function);

    await getDataPromise.resolve(data);

    hook = getHook(wrapper);

    expect(hook.data).toBe(data);
    expect(hook.isLoading).toBe(false);
  });

  it("should refetch data when call fetchData", async () => {
    const wrapper = mount(<HookWrapper hook={useFetchData} />);
    const newData = ["test"];

    await getDataPromise.resolve(data);

    let hook = getHook(wrapper);

    expect(hook.data).toBe(data);
    expect(hook.isLoading).toBe(false);
    expect(hook.fetchData).toBeInstanceOf(Function);

    act(() => {
      hook.fetchData();
    });

    hook = getHook(wrapper);

    expect(hook.data).toBe(data);
    expect(hook.isLoading).toBe(true);

    await getDataPromise.resolve(newData);

    hook = getHook(wrapper);

    expect(hook.data).toBe(newData);
    expect(hook.isLoading).toBe(false);
  });

  it("when fetching data failed", async () => {
    const wrapper = mount(<HookWrapper hook={useFetchData} />);
    const error = "test error";

    let hook = getHook(wrapper);

    expect(hook.data).toEqual([]);
    expect(hook.isLoading).toBe(true);
    expect(hook.fetchData).toBeInstanceOf(Function);

    await getDataPromise.reject(error);

    hook = getHook(wrapper);

    expect(hook.data).toBe("No Data");
    expect(hook.isLoading).toBe(false);
  });
});
