'use client'

import { useField, FieldLabel } from '@payloadcms/ui'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
})

export default function QuillEditor(props: any) {
  const { path, field } = props

  const { value, setValue } = useField<string>({ path })

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* ✅ Correct label source */}
      <div style={{ marginBottom: '8px' }}>
        <FieldLabel
          label={
            <>
              {field.label || field.name}
              {<span style={{ color: 'red' }}> *</span>}
            </>
          }
        />
      </div>

      <ReactQuill theme="snow" value={value || ''} onChange={(content) => setValue(content)} />
    </div>
  )
}
