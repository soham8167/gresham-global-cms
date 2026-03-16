'use client'

import { useField } from '@payloadcms/ui'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
})

export default function QuillEditor({ path }: any) {
  const { value, setValue } = useField<string>({ path })

  return <ReactQuill theme="snow" value={value || ''} onChange={(content) => setValue(content)} />
}
   