/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useOrderDetails } from "../../context/OrderDetails";

export default function ToppingOption({ name, imagePath }) {
  const [itemCount, setItemCount] = useState(0);
  const { updateItemCount } = useOrderDetails();

  useEffect(() => {
    updateItemCount(name, parseInt(itemCount), "toppings");
  }, [itemCount]);

  return (
    <div className="option-card">
      <img src={imagePath} alt={`${name} topping`} />
      <p>{name} Topping</p>
      <div
        className="option-card-action-tab"
        style={{ backgroundColor: "red" }}
      >
        <input
          type="number"
          value={itemCount}
          id={name}
          name={name}
          min="0"
          max="1"
          onChange={(e) => {
            setItemCount(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
