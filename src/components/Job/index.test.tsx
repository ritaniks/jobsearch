import { render, screen } from "@testing-library/react";
import Job from "./index";

const job = {
  id: "8e0afc31-a9ff-4a25-bc79-275a6828b96e",
  description:
    "Quis sit doloremque sit vitae ipsa et error excepturi. Aliquam provident et quaerat distinctio. Sunt repellendus sed aut rerum sunt eligendi ipsum minima. Voluptatem ut reprehenderit sunt delectus ex vel veritatis hic. Est quidem in repudiandae doloremque earum rerum esse. Rerum omnis voluptas rerum aut amet. Unde consequatur omnis nesciunt omnis accusantium. Quisquam et odio qui eveniet. Illo architecto non quisquam tenetur quasi. Nisi occaecati asperiores. Quasi neque voluptate laborum eos sed repellat rem harum rem.",
  role: "Tools Creator",
  url: "http://vague-stuff.org",
  city: "Lompoc",
  priority: 29,
  company: {
    name: "Lockman, Wisoky and Harris",
  },
};

test("renders job role", () => {
  render(<Job {...job} />);
  const linkElement = screen.getByText(/Tools Creator/i);
  expect(linkElement).toBeInTheDocument();
});
