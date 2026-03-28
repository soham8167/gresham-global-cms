
// import type { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   access: {
//     read: () => true,
//     create: () => true,
//     update: () => true,
//     delete: () => true,
//   },
//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       required: true,
//     },
//   ],
//   upload: {
//     disableLocalStorage: true, //  don't save images on Render server disk
//   },
// }











import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],

  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*', 'video/*'], // allow only image & video
  },

  hooks: {
    beforeChange: [
      ({ req }) => {
        const file = req.file;

        if (!file) return;

        const size = file.size;
        const type = file.mimetype;

        // Image limit (2MB)
        if (type.startsWith('image') && size > 1 * 1024 * 1024) {
          throw new Error('Image must be less than 2MB');
        }

        // Video limit (10MB)
        if (type.startsWith('video') && size > 5 * 1024 * 1024) {
          throw new Error('Video must be less than 10MB');
        }
      },
    ],
  },
}