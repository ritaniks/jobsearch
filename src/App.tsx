import { FC, useEffect, useState, useMemo, forwardRef, Ref } from "react";
import useVirtual from "react-cool-virtual";
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
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  const {
    outerRef,
    innerRef,
    items,
  }: {
    outerRef: Ref<HTMLDivElement> | undefined;
    innerRef: Ref<HTMLDivElement> | undefined;
    items: any[];
  } = useVirtual<HTMLDivElement>({
    itemCount: 1000,
    useIsScrolling: true,
  });

  let goToTop: () => void = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleOrder = (newOrder: string) => setOrderby(newOrder);

  const fetchData: () => Promise<void> = async () => {
    const result = await fetch("/jobs.json");
    const data = await result.json();
    setLoading(false);
    setJobs(data);
  };

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

  const HeavyItem = forwardRef(
    (props: any, ref: Ref<HTMLDivElement> | undefined) => {
      const { id } = props;
      return (
        <div {...props} ref={ref}>
          <Job key={id} {...props} />
        </div>
      );
    }
  );

  const LightItem = (props: any) => <div {...props}>Scrolling...</div>;

  return (
    <div
      className="App"
      style={{ width: "100wv", height: "100hv", overflow: "auto" }}
      ref={outerRef}
    >
      {showTopBtn && <ScrollToTop goToTop={goToTop} />}
      <Nav />
      <OrderContext.Provider
        value={{
          orderby: orderby as OrderDefinition,
          toggleOrder,
        }}
      >
        {!!memoJobs.length ? (
          <div data-testid="app-jobs" className="App-jobs">
            <OrderBy />
            <div ref={innerRef}>
              {items.map(
                ({
                  index,
                  isScrolling,
                  measureRef,
                }: {
                  index: number;
                  isScrolling: boolean;
                  measureRef: Ref<HTMLDivElement> | undefined | undefined;
                }) =>
                  isScrolling ? (
                    <LightItem key={index} />
                  ) : (
                    <HeavyItem
                      key={index}
                      ref={measureRef}
                      {...memoJobs[index]}
                    />
                  )
              )}
            </div>
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
