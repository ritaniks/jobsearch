import React, { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import Job from "./components/Job";
import Nav from "./components/Nav";
import OrderBy from "./components/OrderBy";
import OrderContext from "./contexts/OrderContext";
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

  const toggleOrder = (newOrder: string) => {
    console.log(newOrder);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => fetchData(), 1000);
  }, []);

  const sortedJobs: JobDefinition[] = [...jobs].sort(
    (pr1, pr2) => pr1.priority - pr2.priority
  );
  console.log("test:", sortedJobs);

  const JobList: React.ReactElement[] = sortedJobs.map((value) => {
    const { id } = value;
    return <Job key={id} {...value} />;
  });

  const loaderStyle: React.CSSProperties = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="App">
      <Nav />
      {loading && (
        <div style={loaderStyle}>
          <ClimbingBoxLoader color={"#00c"} loading={loading} size={15} />
        </div>
      )}
      <OrderContext.Provider
        value={{
          orderby: OrderTypes.Random,
          toggleOrder,
        }}
      >
        {!!JobList.length && (
          <div data-testid="app-jobs" className="App-jobs">
            <OrderBy />
            {JobList}
          </div>
        )}
      </OrderContext.Provider>
    </div>
  );
};

export default App;
