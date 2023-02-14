import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary() {
  const { optionCounts, totals } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const toppingList = Object.entries(optionCounts.toppings);
  // const toppingList = Object.keys(optionCounts.toppings);

  const grandTotal = Object.values(totals);

  return (
    <div>
      <h1>Order Summary</h1>
      <h3>Scoops: {formatCurrency(totals.scoops)}</h3>
      <div style={{ textAlign: "left", margin: "auto", width: "100px" }}>
        {scoopArray.map(
          ([key, value]) =>
            value > 0 && (
              <li key={key}>
                {value} {key}
              </li>
            )
        )}
      </div>

      <h3>Toppings: {formatCurrency(totals.toppings)}</h3>
      <div style={{ textAlign: "left", margin: "auto", width: "100px" }}>
        {toppingList.map(
          ([key, value]) => value > 0 && <li key={key}>{key}</li>
        )}
      </div>

      <h2>
        Grand total:{" "}
        {formatCurrency(grandTotal.reduce((total, num) => num + total))}
      </h2>
      <SummaryForm />
    </div>
  );
}
