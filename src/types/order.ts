export enum OrderTypes {
  Random = "random",
  Priority = "priority",
}

type OrderDefinition = OrderTypes.Random | OrderTypes.Priority;

export default OrderDefinition;
