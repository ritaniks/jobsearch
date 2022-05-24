import React, { createContext, useState } from "react";
import OrderDefinition, { OrderTypes } from "../types/order";

interface IOrderContext {
  orderby: OrderDefinition;
  setOrder: React.Dispatch<React.SetStateAction<OrderTypes>>;
}

export const OrderContext = createContext<IOrderContext>({} as IOrderContext);

export const connect = (Component: React.FC) => (props: any) => {
  const [orderby, setOrder] = useState(OrderTypes.Random);
  return (
    <OrderContext.Provider value={{ orderby, setOrder }}>
      <Component {...props} />
    </OrderContext.Provider>
  );
};
