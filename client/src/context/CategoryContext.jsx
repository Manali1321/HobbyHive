import { createContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

export const CategoryContext = createContext();
export const CategoryProvider = (props) => {
  const [category, setCategory] = useState(null);
  const fetchData = async () => {
    const resCategory = await api.get("/admin/category");
    // const resService = await api.get("/admin/service");
    setCategory(resCategory.data);
    // setService(resService.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
