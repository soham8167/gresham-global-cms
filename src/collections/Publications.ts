// import { CollectionConfig } from "payload";

// const Publications: CollectionConfig = {
//   slug: "publications",
//    access: {
//     read: () => true,  
//   },
//   admin: {
//     useAsTitle: "title",
//   },
//   fields: [
//     {
//       name: "title",
//       type: "text",
//       required: true,
//     },
//     {
//       name: "excerpt",
//       type: "textarea",
//     },
    
//     {
//       name: "slug",
//       type: "text",
      
//       unique: true,
//     },

// {
//       name: "tag",
//       type: "select",
//       required: true,
//       options: [
//         {
//           label: "Business",
//           value: "business",
//         },
//         {
//           label: "Design",
//           value: "design",
//         },
//         {
//           label: "Engineering",
//           value: "engineering",
//         },
//       ],
//       defaultValue: "business",
//     },

//     {
//       name: "mainImage",
//       type: "upload",
//       relationTo: "media",
//       required: true,
//     },
    
    
//   ],
// };

// export default Publications;











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
    // 🔹 Title
    {
      name: "title",
      type: "text",
      required: true,
    },

    // 🔹 Slug (AUTO GENERATE)
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.title && !data?.slug) {
              return data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            }
            return data?.slug;
          },
        ],
      },
    },

    // 🔹 Summary
    {
      name: "summary",
      type: "textarea",
    },

    // 🔹 Tag
    {
      name: "tag",
      type: "select",
      required: true,
      options: [
        { label: "Business", value: "business" },
        { label: "Design", value: "design" },
        { label: "Engineering", value: "engineering" },
      ],
      defaultValue: "business",
    },

    // 🔹 Main Image
    {
      name: "mainImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    // 🔹 Details Page Image
    {
      name: "detailsPageImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    // 🔥 FRONT SECTIONS
    {
      name: "frontSections",
      label: "Front Sections (Image + Title + Points)",
      type: "array",
      minRows: 1,
      fields: [
        // ✅ FIXED NAME
        {
          name: "title",
          type: "text",
          required: true,
        },

        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },

        {
          name: "points",
          type: "array",
          minRows: 1,
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },

    // 🔥 DETAILS (3 items fixed)
    {
      name: "details",
      label: "Details (Icon + Description)",
      type: "array",
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: "detailImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};

export default Publications;