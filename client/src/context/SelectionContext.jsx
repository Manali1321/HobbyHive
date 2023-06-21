import React, { createContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

export const SelectionContext = createContext();
export const SelectionProvider = (props) => {
  const [selectedId, setSelectedId] = useState("");

  // const fetchData = async (selectedId) => {
  //   if (selectedId) {
  //     try {
  //       const response = await api.get(`/buyer/seller/${selectedId}`);
  //       const data = response.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const contextValue = {
    selectedId,
    setSelectedId,
  };

  // useEffect(() => {
  //   fetchData(selectedId); // Pass the selectedId to the fetchData function
  // }, [selectedId]);

  return (
    <SelectionContext.Provider value={contextValue}>
      {props.children}
    </SelectionContext.Provider>
  );
};
