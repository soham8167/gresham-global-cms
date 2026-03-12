import { CollectionConfig } from "payload";

const Publications: CollectionConfig = {
  slug: "publications",
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
      name: "excerpt",
      type: "textarea",
    },
    
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },

{
      name: "tag",
      type: "select",
      required: true,
      options: [
        {
          label: "Business",
          value: "business",
        },
        {
          label: "Design",
          value: "design",
        },
        {
          label: "Engineering",
          value: "engineering",
        },
      ],
      defaultValue: "business",
    },

    {
      name: "mainImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    
    
  ],
};

export default Publications;