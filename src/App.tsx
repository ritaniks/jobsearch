import { FC, ReactElement, useEffect, useState, useMemo } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import Job from "./components/Job";
import Nav from "./components/Nav";
import OrderBy from "./components/OrderBy";
import OrderContext from "./contexts/OrderContext";

import OrderDefinition, { OrderTypes } from "./types/order";
import sortJobs from "./utils/sortJobs";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

const App: FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [orderby, setOrderby] = useState<string>(OrderTypes.Random);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const fetchData: () => Promise<void> = async () => {
    const result = await fetch("/jobs.json");
    const data = await result.json();
    setLoading(false);
    setJobs(data);
  };

  let goToTop: () => any = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleOrder = (newOrder: string) => setOrderby(newOrder);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => fetchData(), 2000);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const memoJobs = useMemo(() => {
    return sortJobs(jobs, orderby as OrderDefinition);
  }, [jobs, orderby]);

  const JobList: ReactElement[] = memoJobs.map((value) => {
    const { id } = value;
    return <Job key={id} {...value} />;
  });

  return (
    <div className="App">
      {showTopBtn && <ScrollToTop goToTop={goToTop} />}
      <Nav />
      <OrderContext.Provider
        value={{
          orderby: orderby as OrderDefinition,
          toggleOrder,
        }}
      >
        {!!JobList.length ? (
          <div data-testid="app-jobs" className="App-jobs">
            <OrderBy />
            {JobList}
          </div>
        ) : (
          <div className="Loader">
            <ClimbingBoxLoader color={"#00c"} loading={loading} size={15} />
          </div>
        )}
      </OrderContext.Provider>
    </div>
  );
};

export default App;
