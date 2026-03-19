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

  // ✅ label must be a string, not JSX
  const labelText: string = (field.label as string) || field.name || ''

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '8px' }}>
        {/* ✅ pass string label + required marker separately */}
        <FieldLabel label={labelText} required={field.required} />
      </div>

      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={(content) => setValue(content)}
      />
    </div>
  )
}
