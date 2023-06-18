import { createContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

export const ServiceContext = createContext();
export const ServiceProvider = (props) => {
  const [service, setService] = useState(null);
  const fetchData = async () => {
    // const resCategory = await api.get("/admin/category");
    const resService = await api.get("/admin/service");
    // setCategory(resCategory.data);
    setService(resService.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ServiceContext.Provider value={{ service, setService }}>
      {props.children}
    </ServiceContext.Provider>
  );
};
