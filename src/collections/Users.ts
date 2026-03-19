// import { hasRole } from '@/utils/has-role'
// import type { CollectionConfig } from 'payload'

// export const Users: CollectionConfig = {
//   slug: 'users',
//   admin: {
//     useAsTitle: 'name',
//   },
//   access: {
//     read: ({ req }) => {
//       if (!req.user) return false

//       if (hasRole(req.user, ['admin'])) return true

//       return { id: { equals: req.user.id } }
//     },

//     create: ({ req }) => hasRole(req.user, ['admin']),
//     update: ({ req }) => hasRole(req.user, ['admin']),
//     delete: ({ req }) => hasRole(req.user, ['admin']),
//   },
//   auth: true,
//   fields: [
//     { name: 'name', label: 'Name', type: 'text', required: true },
//     {
//       name: 'avatar',
//       label: 'Profile Image',
//       type: 'upload',
//       relationTo: 'media',
//     },
//     {
//       name: 'roles',
//       type: 'select',
//       required: true,
//       options: [
//         { label: 'Admin', value: 'admin' },
//         { label: 'Editor', value: 'editor' },
//         { label: 'Viewer', value: 'viewer' },
//       ],
//       defaultValue: ['editor'],
//     },
//   ],
// }






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
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      label: 'Profile Image',
      type: 'upload',
      relationTo: 'media',
      // ✅ THIS IS THE FIX
      // saveToJWT stores the populated avatar object (including url) in the
      // JWT token — without this, useAuth() only returns the ID string,
      // not the full object, so the image URL is never available
      saveToJWT: true,
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
      // ✅ also save roles to JWT so hasRole() works in access controls
      saveToJWT: true,
    },
  ],
}
