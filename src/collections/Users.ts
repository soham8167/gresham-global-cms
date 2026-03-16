import { hasRole } from '@/utils/has-role'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false

      if (hasRole(req.user, ['admin'])) return true

      return { id: { equals: req.user.id } }
    },

    create: ({ req }) => hasRole(req.user, ['admin']),
    update: ({ req }) => hasRole(req.user, ['admin']),
    delete: ({ req }) => hasRole(req.user, ['admin']),
  },
  auth: true,
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'avatar',
      label: 'Profile Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      defaultValue: ['editor'],
    },
  ],
}


