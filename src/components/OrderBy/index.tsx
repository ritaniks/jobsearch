import React, { useState, useContext } from "react";

import { OrderTypes } from "../../types/order";
import OrderContext from "../../contexts/OrderContext";
import "./index.css";

const OrderBy: React.FC = () => {
  const [selected, setSelected] = useState(OrderTypes.Random);

  const { toggleOrder } = useContext(OrderContext);

  const onOrderChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (
      e.target.value === OrderTypes.Random ||
      e.target.value === OrderTypes.Prioprity
    ) {
      toggleOrder?.(e.target.value);
      setSelected(e.target.value);
    }
  };

  return (
    <div className="App-sortby">
      <span className="App-sortby__label">Sort by: </span>
      <select
        className="App-sortby__select"
        id="filtersortby"
        onChange={onOrderChange}
        value={selected}
      >
        <option value={OrderTypes.Random}>Random</option>
        <option value={OrderTypes.Prioprity}>By Priority</option>
      </select>
    </div>
  );
};

export default OrderBy;
