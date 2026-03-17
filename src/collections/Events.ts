import { CollectionConfig } from 'payload'
import { hasRole } from '@/utils/has-role'

const Events: CollectionConfig = {
  slug: 'events',

  access: {
    read: () => true,
    create: ({ req }) => hasRole(req.user, ['admin', 'editor']),
    update: ({ req }) => hasRole(req.user, ['admin', 'editor']),
    delete: ({ req }) => hasRole(req.user, ['admin', 'editor']),
  },

  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      admin: {
        components: {
          Field: '@/components/fields/QuillEditor',
        },
      },
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'hasVideo',
      label: 'Video',
      type: 'checkbox',
    },

    {
      name: 'video',
      admin: {
        condition: (data) => Boolean(data.hasVideo),
      },
      label: 'Video Link',
      type: 'text',
    },

    {
      name: 'hasGallery',
      label: 'Gallery',
      type: 'checkbox',
    },

    {
      name: 'gallery',
      admin: {
        condition: (data) => Boolean(data.hasGallery),
      },
      label: 'Gallery Images',
      type: 'array',
      fields: [
        {
          name: 'location',
          type: 'text',
          required: true,
        },

        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

export default Events
