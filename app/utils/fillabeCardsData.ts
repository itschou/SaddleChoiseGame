"use client";
import { useState } from "react";
import defaultData from "../data/cardsStateData";

const FillableCardsData = () => {
  const [data, setData] = useState(defaultData);

  const Dupdata = [...data];

  const setFillableCardsData = (id: number, etat: boolean) => {
    // setData(
    //   data.map((item) => (item.id === id ? { ...item, isActif: etat } : item))
    // );

    data[id].isActif = etat;
    console.log(Dupdata);
  };

  const getFillableCardsData = () => {
    return data;
  };

  return {
    setFillableCardsData,
    getFillableCardsData,
  };
};

export default FillableCardsData;
