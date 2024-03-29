import {
  FC,
  useEffect,
  useState,
  useMemo,
  forwardRef,
  Ref,
  SetStateAction,
} from "react";
import axios from "axios";
import useVirtual from "react-cool-virtual";
import "intersection-observer";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import Job from "./components/Job";
import Nav from "./components/Nav";
import OrderBy from "./components/OrderBy";
import OrderContext from "./contexts/OrderContext";
import Skeleton from "./components/Skeleton";

import OrderDefinition, { OrderTypes } from "./types/order";
import sortJobs from "./utils/sortJobs";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

const TOTAL_JOBS = 500;
const BATCH_JOBS = 5;
let acc: any[] = [];

const loadData = async (
  { loadIndex, startIndex, stopIndex }: any,
  setJobs: SetStateAction<any>
) => {
  try {
    const { data: jobsFetch } = await axios("/jobs.json");

    for (let i = startIndex; i <= stopIndex; i++) {
      acc.push(jobsFetch[i]);
    }

    setJobs((prevJobs: any) => {
      const nextJobs = [...prevJobs];

      acc.forEach((job: any) => {
        nextJobs[job.index] = job;
      });

      return nextJobs;
    });
  } catch (err) {
    loadData({ loadIndex }, setJobs);
  }
};

const App: FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [orderby, setOrderby] = useState<string>(OrderTypes.Random);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  const {
    outerRef,
    innerRef,
    items,
    startItem,
  }: {
    outerRef: Ref<HTMLDivElement> | undefined;
    innerRef: Ref<HTMLDivElement> | undefined;
    items: any[];
    startItem: (index: number, callback?: () => void) => void;
  } = useVirtual<HTMLDivElement>({
    itemCount: jobs.length,
    loadMoreCount: BATCH_JOBS,
    loadMore: (e) => {
      loadData(e, setJobs);
    },
    useIsScrolling: true,
  });

  let goToTop: () => void = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleOrder = (newOrder: string) => setOrderby(newOrder);

  useEffect(() => {
    setLoading(true);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  useEffect(() => {
    startItem(BATCH_JOBS, () => {
      if (jobs.length < TOTAL_JOBS) loadData(0, setJobs);
    });
  }, [jobs.length, startItem]);

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

  const LightItem = (props: any) => (
    <div {...props} className="Skeleton">
      <Skeleton />
    </div>
  );

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
        <div
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          ref={outerRef}
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
                    measureRef: Ref<HTMLDivElement> | undefined;
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
        </div>
      </OrderContext.Provider>
    </div>
  );
};

export default App;
