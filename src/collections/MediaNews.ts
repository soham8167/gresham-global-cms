import { CollectionConfig } from "payload";

const MediaNews: CollectionConfig = {
  slug: "media-news",
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
      relationTo: "media",
      required: true,
    },
    {
      name: "publicationLogo",
      type: "upload",
      relationTo: "media",
    },
    
  ],
};

export default MediaNews;