/* eslint-disable no-console */
import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileContext } from './FileContext'

export default function Dropzone() {
  const [, setFile] = useContext(FileContext)
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((incoming) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          const binaryStr = reader.result
          console.log(binaryStr)
          const file = new Uint8Array(binaryStr)
          setFile(file)
        }
        reader.readAsArrayBuffer(incoming)
      })
    },
    [setFile]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
    </div>
  )
}
