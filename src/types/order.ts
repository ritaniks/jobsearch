export enum OrderTypes {
  Random = "random",
  Prioprity = "priority",
}

type OrderDefinition = OrderTypes.Random | OrderTypes.Prioprity;

export default OrderDefinition;
