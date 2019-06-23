import React from "react";
import { mount } from "enzyme";
import CommentWithCustomHook from "./CommentWithCustomHook";
import { useFetchData } from "./hooks/customHook";

jest.mock("./hooks/customHook", () => {
  let state = {
    data: null,
    fetchData: jest.fn(),
    isLoading: true,
  };

  const useFetchData = jest.fn(() => state);
  useFetchData.getState = () => state;
  useFetchData.setState = newState => {
    state = { ...state, ...newState };
  };

  return { useFetchData };
});

describe("CommentWithCustomHook", () => {
  it("should render correctly when isLoading is true", () => {
    const wrapper = mount(<CommentWithCustomHook />);
    const loadingNode = wrapper.find('[data-test-id="loading"]');
    const dataNode = wrapper.find('[data-test-id="data"]');
    const button = wrapper.find('[data-test-id="btn-refetch"]');

    const { fetchData } = useFetchData.getState();

    expect(loadingNode).toHaveLength(1);
    expect(loadingNode.text()).toBe("Loading...");

    expect(dataNode).toHaveLength(0);

    expect(button).toHaveLength(1);
    expect(button.prop("onClick")).toBe(fetchData);
  });

  it("should render correctly when isLoading is false", () => {
    useFetchData.setState({ data: "test data", isLoading: false });

    const wrapper = mount(<CommentWithCustomHook />);
    const loadingNode = wrapper.find('[data-test-id="loading"]');
    const dataNode = wrapper.find('[data-test-id="data"]');
    const button = wrapper.find('[data-test-id="btn-refetch"]');

    const { data, fetchData } = useFetchData.getState();

    expect(loadingNode).toHaveLength(0);

    expect(dataNode).toHaveLength(1);
    expect(dataNode.text()).toBe(data);

    expect(button).toHaveLength(1);
    expect(button.prop("onClick")).toBe(fetchData);
  });
});
