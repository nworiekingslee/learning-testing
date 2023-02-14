/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useOrderDetails } from "../../context/OrderDetails";

const ScoopOptions = ({ name, imagePath }) => {
  const [itemCount, setItemCount] = useState(0);
  const { updateItemCount } = useOrderDetails();

  useEffect(() => {
    updateItemCount(name, parseInt(itemCount), "scoops");
  }, [itemCount]);

  return (
    <div className="option-card">
      <img src={imagePath} alt={`${name} scoop`} />
      <p>{name} Scoop</p>
      <div className="option-card-action-tab">
        <label htmlFor={name}></label>
        <input
          type="number"
          value={itemCount}
          id={name}
          name={name}
          min="0"
          onChange={(e) => {
            setItemCount(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default ScoopOptions;
