'use client'

import { useAuth } from '@payloadcms/ui'

export default function AdminAvatar() {
  const { user } = useAuth()

  // ✅ TEMPORARY DEBUG — open browser console and check what prints
  console.log('AdminAvatar user:', JSON.stringify(user, null, 2))
  console.log('AdminAvatar avatar field:', (user as any)?.avatar)

  const typedUser = user as any

  const imageUrl =
    typedUser?.avatar &&
    typeof typedUser.avatar === 'object' &&
    typedUser.avatar.url
      ? typedUser.avatar.url
      : null

  const initials = typedUser?.name
    ? typedUser.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : typedUser?.email?.[0]?.toUpperCase() || '?'

  // ✅ always show something so top-right is never blank
  return (
    <div style={{ position: 'relative' }}>
      {imageUrl ? (
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
      ) : (
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
      )}
    </div>
  )
}
