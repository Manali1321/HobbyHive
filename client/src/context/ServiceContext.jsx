import { createContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

export const ServiceContext = createContext();
export const ServiceProvider = (props) => {
  const [service, setService] = useState(null);
  const fetchData = async () => {
    const resService = await api.get("/admin/service");
    setService(resService.data);
  };
  const refetchData = async () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  const contextValue = {
    service,
    setService,
    refetchData,
  };

  return (
    <ServiceContext.Provider value={contextValue}>
      {props.children}
    </ServiceContext.Provider>
  );
};
