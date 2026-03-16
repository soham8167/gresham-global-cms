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
      type: 'text',
      required: true,
    },
    {
      name: 'university',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'jobType',
      type: 'text',
      required: true,
    },
    {
      name: 'workEx',
      type: 'text',
      required: true,
    },
  ],
}

export default Jobs;









