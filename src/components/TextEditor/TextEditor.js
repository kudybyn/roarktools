import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ onContentChange }) => {
  const [editorHtml, setEditorHtml] = useState('')

  const handleChange = (html) => {
    setEditorHtml(html)
    onContentChange(html)
  }

  return (
    <div>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
      />
    </div>
  )
}

TextEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }], // Add font size dropdown
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['image', 'code-block'],
  ],
}

TextEditor.formats = [
  'header',
  'font',
  'size',
  'list',
  'bullet',
  'bold',
  'italic',
  'underline',
  'image',
  'code-block',
]

export default TextEditor
