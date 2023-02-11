import { createContext, useContext, useState } from "react";

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
    // const newOptionCounts = { ...optionCounts };
    // newOptionCounts[optionType][itemName] = newItemCount;
    // setOptionCounts(newOptionCounts);

    setOptionCounts((prev) => ({
      ...prev,
      [optionType]: { ...[optionType], [itemName]: newItemCount },
    }));
  }

  function resetOrder() {
    setOptionCounts({
      scoops: {},
      toppings: {},
    });
  }
  const value = { optionCounts, updateItemCount };
  return <OrderDetails.Provider value={value} {...props} />;
}
