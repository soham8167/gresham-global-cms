import { CollectionConfig } from "payload";

const Events: CollectionConfig = {
  slug: "events",

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
      name: "date",
      type: "date",
      required: true,
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },

    {
      name: "mainImage",
      type: "upload",
      relationTo: "media", // media collection
      required: true,
    },
  ],
};

export default Events;