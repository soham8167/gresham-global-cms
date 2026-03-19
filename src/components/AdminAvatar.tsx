'use client'

import { useAuth } from '@payloadcms/ui'

// ✅ avatar comes from JWT as a populated object (because saveToJWT: true)
interface AvatarObject {
  url?: string
  alt?: string
}

interface UserWithAvatar {
  id: string
  name?: string
  email: string
  // after saveToJWT: true, this is the full populated object, not just an ID
  avatar?: AvatarObject | string | null
  roles?: string
}

export default function AdminAvatar() {
  const { user } = useAuth()

  const typedUser = user as UserWithAvatar | null

  // ✅ safely extract URL — handles both populated object and edge cases
  let imageUrl: string | null = null

  if (typedUser?.avatar) {
    if (typeof typedUser.avatar === 'object' && typedUser.avatar.url) {
      // populated object — normal case after saveToJWT: true
      imageUrl = typedUser.avatar.url
    }
  }

  // ✅ initials fallback from name or email
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

  // ✅ fallback — red initials circle
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
