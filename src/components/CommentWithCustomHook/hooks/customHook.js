import { useState, useEffect } from "react";
import { getData } from "services/dataService";

export const useFetchData = () => {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
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
        setFetched(true);
      });
  };

  useEffect(() => {
    !fetched && fetchData();
  }, [fetched]);

  return { data, fetchData, isLoading };
};
