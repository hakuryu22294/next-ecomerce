import React from 'react'
import { useDropzone } from 'react-dropzone'

interface TProps {
  children: React.ReactNode
  uploadFunc: (file: File) => void
  objectAcceptFile?: Record<string, string[]>
}
const WrapperFileUpload = (props: TProps) => {
  const { children, uploadFunc, objectAcceptFile } = props
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: objectAcceptFile ? objectAcceptFile : {},
    onDrop: acceptedFiles => {
      uploadFunc(acceptedFiles[0])
    }
  })

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {children}
      </div>
    </section>
  )
}

export default WrapperFileUpload
