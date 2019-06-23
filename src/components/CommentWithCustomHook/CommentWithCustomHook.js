import React from "react";
import { useFetchData } from "./hooks/customHook";

const CommentWithCustomHook = () => {
  const { data, fetchData, isLoading } = useFetchData();

  return (
    <div>
      {isLoading ? (
        <span data-test-id="loading">Loading...</span>
      ) : (
        <span data-test-id="data">{data}</span>
      )}

      <button
        style={{ marginLeft: "20px" }}
        data-test-id="btn-refetch"
        onClick={fetchData}
      >
        refetch data
      </button>
    </div>
  );
};

export default CommentWithCustomHook;
