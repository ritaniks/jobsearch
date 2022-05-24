import React, { useEffect, useState, useContext } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import Job from "./components/Job";
import Nav from "./components/Nav";
import OrderBy from "./components/OrderBy";
import { connect, OrderContext } from "./contexts/OrderContext";
import { OrderTypes } from "./types/order";
import JobDefinition from "./types/job";

import "./App.css";

const App: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData: () => Promise<void> = async () => {
    const result = await fetch("/jobs.json");
    const data = await result.json();
    setLoading(false);
    setJobs(data);
  };

  const { orderby } = useContext(OrderContext);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => fetchData(), 1000);
  }, []);

  let sortedJobs: JobDefinition[];

  if (orderby === OrderTypes.Prioprity) {
    sortedJobs = [...jobs].sort((pr1, pr2) => pr1.priority - pr2.priority);
  } else sortedJobs = shuffleArray([...jobs]);

  function shuffleArray(array: JobDefinition[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const JobList: React.ReactElement[] = sortedJobs.map((value) => {
    const { id } = value;
    return <Job key={id} {...value} />;
  });

  return (
    <div className="App">
      <Nav />
      {loading && (
        <div className="Loader">
          <ClimbingBoxLoader color={"#00c"} loading={loading} size={15} />
        </div>
      )}
      {!!JobList.length && (
        <div data-testid="app-jobs" className="App-jobs">
          <OrderBy />
          {JobList}
        </div>
      )}
    </div>
  );
};

export default connect(App);
