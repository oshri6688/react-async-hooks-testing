import React, { useState, useEffect } from "react";
import { getData } from "services/dataService";

const CommentWithHooks = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);

    getData()
      .then(data => {
        setData(data);
      })
      .catch(err => {
        setData("No Data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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

export default CommentWithHooks;
