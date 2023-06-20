import { createContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

export const CategoryContext = createContext();
export const CategoryProvider = (props) => {
  const [category, setCategory] = useState(null);
  const fetchData = async () => {
    const resCategory = await api.get("/admin/category");
    setCategory(resCategory.data);
  };
  const refetchData = async () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  const contextValue = {
    category,
    setCategory,
    refetchData,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {props.children}
    </CategoryContext.Provider>
  );
};
