import { useState, useEffect } from "react";
import { getData } from "services/dataService";

export const useFetchData = () => {
  const [data, setData] = useState([]);
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

  return { data, fetchData, isLoading };
};
