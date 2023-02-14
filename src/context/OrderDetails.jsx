import { useState, useContext, createContext } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// Create a custom hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called form a OrderDetailsProvider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    setOptionCounts((prev) => ({
      ...prev,
      [optionType]: { ...prev[optionType], [itemName]: newItemCount },
    }));
  }

  function resetOrder() {
    setOptionCounts({
      scoops: {},
      toppings: {},
    });
  }

  function calculateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType]);

    const totalCount = countsArray.reduce((total, value) => total + value, 0);
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
