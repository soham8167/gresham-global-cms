'use client'

import { useAuth } from '@payloadcms/ui'

// ✅ matches your Users.ts exactly — field is called "avatar"
interface UserWithAvatar {
  id: string
  name?: string
  email: string
  avatar?: {
    url?: string
    alt?: string
  }
  roles?: string
}

export default function AdminAvatar() {
  const { user } = useAuth()

  const typedUser = user as UserWithAvatar | null

  // avatar field from your Users.ts
  const imageUrl =
    typedUser?.avatar &&
    typeof typedUser.avatar === 'object' &&
    typedUser.avatar.url
      ? typedUser.avatar.url
      : null

  // ✅ fallback initials from name or email
  const initials = typedUser?.name
    ? typedUser.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : typedUser?.email?.[0]?.toUpperCase() || '?'

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={typedUser?.name || 'Profile'}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid rgba(255,255,255,0.15)',
          display: 'block',
          cursor: 'pointer',
        }}
      />
    )
  }

  // ✅ fallback — red circle with initials
  return (
    <div
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        backgroundColor: '#b91c1c',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 700,
        border: '2px solid rgba(255,255,255,0.15)',
        flexShrink: 0,
        cursor: 'pointer',
      }}
    >
      {initials}
    </div>
  )
}
