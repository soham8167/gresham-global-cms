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
  name: "hasVideo",
  type: "checkbox",
  label: "Add Video",
},
{
  name: "video",
  type: "upload",
  relationTo: "media",
  admin: {
    condition: (data) => Boolean(data.hasVideo),
  },
},
{
  name: "slug",
  type: "text",
  required: false,
}
  ],
};

export default NewsBlogs;


