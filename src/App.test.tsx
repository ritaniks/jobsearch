import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders joblist", async () => {
  render(<App />);
  setTimeout(async () => {
    const jobsElement = screen.getByTestId("app-jobs");
    expect(jobsElement).toBeInTheDocument();
  }, 5000);
});
