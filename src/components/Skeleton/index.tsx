import "./index.css";

export default function Skeleton() {
  return (
    <>
      <div className="Skeleton-card">
        <div className="Skeleton-placeholder"></div>
      </div>
      <svg height="0" width="0">
        <defs>
          <clipPath id="svgPath">
            <rect x="0" y="0" width="200" height="16"></rect>
            <rect x="0" y="24" width="150" height="12"></rect>
            <rect x="0" y="60" width="655" height="84"></rect>
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
