import JobDefinition from "./job";
import OrderDefinition from "./order";

export type SortJobsFn = (
    jobs: JobDefinition[],
    orderby: OrderDefinition
) => JobDefinition[];