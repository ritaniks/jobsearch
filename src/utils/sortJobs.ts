  import { OrderTypes } from "../types/order"
  import { SortJobsFn } from "../types/sortJobsFn"
  import shuffleArray from "./shuffleArray";
  
  const sortJobs: SortJobsFn = (jobs, orderby) => {

  const jobsCopy = [...jobs];

  switch (orderby) {
      case OrderTypes.Random:
          return shuffleArray(jobsCopy);
  
      case OrderTypes.Priority:
          return jobsCopy.sort((pr1, pr2) => {
              return pr2.priority - pr1.priority;
            })
    }
  };

  export default sortJobs;