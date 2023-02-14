import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import axios from "axios";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";
import "../../styles/pages/entry/Options.css";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const { totals } = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    // Attach an abort controller to network request
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((response) => setItems(response.data))
      .catch((err) => {
        console.log(err);
        if (err.name !== "CanceledError") {
          setError(true);
        }
      });

    // abort axios call on component unmount
    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <p className="option-title">{title}</p>
      <p className="option-price">
        {formatCurrency(pricePerItem[optionType])} each
      </p>
      <div className="option-row">{optionItems}</div>
      <p className="option-total">
        {title} total: {formatCurrency(totals[optionType])}
      </p>
    </>
  );
}
