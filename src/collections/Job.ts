import { CollectionConfig } from "payload";

const Jobs: CollectionConfig = {
  slug: "jobs",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "university",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "jobType",
      type: "text",
      required: true,
    },
    {
      name: "workEx",
      type: "text",
      required: true,
    },
    
  ],
};

export default Jobs;









