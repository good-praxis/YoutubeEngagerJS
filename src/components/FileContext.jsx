import React, { createContext, useState } from 'react'

export const FileContext = createContext([
  {
    file: undefined,
  },
  (obj) => obj,
])

const FileContextContainer = ({ children }) => {
  const fileState = useState(undefined)
  return (
    <FileContext.Provider value={fileState}>{children}</FileContext.Provider>
  )
}

export default FileContextContainer
