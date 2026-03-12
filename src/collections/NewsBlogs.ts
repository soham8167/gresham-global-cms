import { CollectionConfig } from "payload";

const NewsBlogs: CollectionConfig = {
  slug: "news-blogs",

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
      required: true,
    },

    {
      name: "date",
      type: "date",
      required: true,
    },

    {
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          label: "News",
          value: "news",
        },
        {
          label: "Blogs",
          value: "blogs",
        },
      ],
      defaultValue: "news",
    },

    {
      name: "mainImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};

export default NewsBlogs;