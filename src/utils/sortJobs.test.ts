import sortJobs from "./sortJobs";
import { OrderTypes } from "../types/order";
import JobDefinition from "../types/job";
const faker = require("@faker-js/faker").default;

// change this line to encrease the number of generated jobs
const NUMBER_OF_JOBS = 5000;
const jobsTest: JobDefinition[] = [];

for (let i = 0; i < NUMBER_OF_JOBS; i++) {
  const company = {
    name: faker.company.companyName(),
  };
  const job = {
    id: faker.datatype.uuid(),
    description: faker.lorem.paragraph(10),
    role: `${faker.commerce.department()} Creator`,
    url: faker.internet.url(),
    city: faker.address.cityName(),
    priority: faker.datatype.number(100),
    company,
  };
  jobsTest.push(job);
}

test("check fn sort orders by priority", () => {
  const orderedJobsTest = sortJobs(jobsTest, OrderTypes.Priority);
  expect(orderedJobsTest).toEqual(
    [...jobsTest].sort((a, b) => b.priority - a.priority)
  );
});
