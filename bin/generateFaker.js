const faker = require("@faker-js/faker").default;
const fs = require("fs");
const path = require("path");

// change this line to encrease the number of generated jobs
const NUMBER_OF_JOBS = 100;
const jobs = [];

console.log("Start gen jobs.json");

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
  jobs.push(job);
}
const filePath = path.join(__dirname, "../public/jobs.json");
fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2), {
  encoding: "utf-8",
});

console.log("End gen jobs.json");
