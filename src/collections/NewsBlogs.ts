import { CollectionConfig } from "payload";
import { hasRole } from "@/utils/has-role";

const NewsBlogs: CollectionConfig = {
  slug: "news-blogs",

  access: {
    read: () => true,
    create: ({ req }) => hasRole(req.user, ["admin", "editor"]),
    update: ({ req }) => hasRole(req.user, ["admin", "editor"]),
    delete: ({ req }) => hasRole(req.user, ["admin", "editor"]),
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
      name: "details",
      type: "richText",
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

    // ✅ FIXED FIELD NAME
    {
      name: "aboutNewsBlogs",
      label: "About News & Blogs",
      type: "text",
    },

    // ✅ REQUIRED FOR CONDITION
    {
      name: "hasGallery",
      label: "Enable Gallery",
      type: "checkbox",
    },

    {
      name: "gallery",
      label: "Gallery Images",
      type: "array",
      admin: {
        condition: (data) => Boolean(data.hasGallery),
      },
      fields: [
        {
          name: "images",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
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