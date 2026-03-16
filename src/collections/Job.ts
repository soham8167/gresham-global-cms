import { CollectionConfig } from "payload";
import { hasRole } from '@/utils/has-role'

const Jobs: CollectionConfig = {
  slug: 'jobs',
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
      label: 'Job Title',
      type: 'text',
      required: true,
    },
    {
      name: 'university',
      label: 'University',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true,
    },
    {
      name: 'jobType',
      label: 'Job Type',
      type: 'text',
      required: true,
    },
    {
      name: 'workEx',
      label: 'Work Experience',
      type: 'text',
      required: true,
    },
    {
      name: 'aboutJob',
      label: 'About Job',
      type: 'text',
      admin: {
        components: {
          Field: '@/components/fields/QuillEditor',
        },
      },
    },
  ],
}

export default Jobs;









