import { CollectionConfig } from 'payload'
import { hasRole } from '@/utils/has-role'

const CandidateResponse: CollectionConfig = {
  slug: 'candidate-response',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req }) => hasRole(req.user, ['admin', 'editor']),
    create: ({ req }) => !req.user,
    update: () => false,
    delete: ({ req }) => hasRole(req.user, ['admin', 'editor']),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
    },
    { name: 'city', type: 'text', required: true },
    {
      name: 'workExperience',
      type: 'text',
      required: true,
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default CandidateResponse
