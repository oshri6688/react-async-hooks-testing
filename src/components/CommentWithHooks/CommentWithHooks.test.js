import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import MockPromise from "testUtils/MockPromise";
import CommentWithHooks from "./CommentWithHooks";
import { getData } from "services/dataService";

jest.mock("services/dataService", () => ({
  getData: jest.fn(),
}));

let getDataPromise;

getData.mockImplementation(() => {
  getDataPromise = new MockPromise();

  return getDataPromise;
});

describe("CommentWithHooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("when fetching data successed", async () => {
    const wrapper = mount(<CommentWithHooks />);
    const button = wrapper.find('[data-test-id="btn-refetch"]');
    let loadingNode = wrapper.find('[data-test-id="loading"]');
    let dataNode = wrapper.find('[data-test-id="data"]');

    const data = "test Data";

    expect(loadingNode).toHaveLength(1);
    expect(loadingNode.text()).toBe("Loading...");

    expect(dataNode).toHaveLength(0);

    expect(button).toHaveLength(1);
    expect(button.prop("onClick")).toBeInstanceOf(Function);

    await getDataPromise.resolve(data);

    wrapper.update();

    loadingNode = wrapper.find('[data-test-id="loading"]');
    dataNode = wrapper.find('[data-test-id="data"]');

    expect(loadingNode).toHaveLength(0);

    expect(dataNode).toHaveLength(1);
    expect(dataNode.text()).toBe(data);
  });

  it("when fetching data failed", async () => {
    const wrapper = mount(<CommentWithHooks />);
    const button = wrapper.find('[data-test-id="btn-refetch"]');
    let loadingNode = wrapper.find('[data-test-id="loading"]');
    let dataNode = wrapper.find('[data-test-id="data"]');

    const error = "test error";

    expect(loadingNode).toHaveLength(1);
    expect(loadingNode.text()).toBe("Loading...");

    expect(dataNode).toHaveLength(0);

    expect(button).toHaveLength(1);
    expect(button.prop("onClick")).toBeInstanceOf(Function);

    await getDataPromise.reject(error);

    wrapper.update();

    loadingNode = wrapper.find('[data-test-id="loading"]');
    dataNode = wrapper.find('[data-test-id="data"]');

    expect(loadingNode).toHaveLength(0);

    expect(dataNode).toHaveLength(1);
    expect(dataNode.text()).toBe("No Data");
  });

  it("should refetch data when clicking refetch button", async () => {
    const wrapper = mount(<CommentWithHooks />);
    const button = wrapper.find('[data-test-id="btn-refetch"]');
    let loadingNode = wrapper.find('[data-test-id="loading"]');
    let dataNode = wrapper.find('[data-test-id="data"]');

    const refetchData = button.prop("onClick");
    const data = "test Data";
    const error = "test error";

    await getDataPromise.reject(error);

    wrapper.update();

    loadingNode = wrapper.find('[data-test-id="loading"]');
    dataNode = wrapper.find('[data-test-id="data"]');

    expect(loadingNode).toHaveLength(0);

    expect(dataNode).toHaveLength(1);
    expect(dataNode.text()).toBe("No Data");

    act(() => {
      refetchData();
    });

    await getDataPromise.resolve(data);

    wrapper.update();

    loadingNode = wrapper.find('[data-test-id="loading"]');
    dataNode = wrapper.find('[data-test-id="data"]');

    expect(loadingNode).toHaveLength(0);

    expect(dataNode).toHaveLength(1);
    expect(dataNode.text()).toBe(data);
  });
});
