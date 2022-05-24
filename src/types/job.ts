type CompanyDefinition = {
  name: string;
};

type JobDefinition = {
  description: string;
  priority: number;
  id: string;
  role: string;
  url: string;
  city: string;
  company: CompanyDefinition;
};

export default JobDefinition;
