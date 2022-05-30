import "./index.css";

const ScrollToTop = ({ goToTop }: any) => {
  return (
    <div className="top-to-btm">
      <button
        type="button"
        onClick={goToTop}
        className="icon-position icon-style"
      >
        ▲
      </button>
    </div>
  );
};

export default ScrollToTop;
