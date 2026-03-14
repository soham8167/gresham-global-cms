import { CollectionConfig } from "payload";

const CareerDetails: CollectionConfig = {
  slug: "career-details",

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
      name: "aboutJobPoints",
      label: "About Job Points",
      type: "array",
      fields: [
        {
          name: "point",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default CareerDetails;





    