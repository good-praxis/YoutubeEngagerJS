import React from 'react'
import './styles.css'
import FileContextContainer from './components/FileContext'
import Dropzone from './components/Dropzone'
import DatabaseView from './components/DatabaseView'
import initSqlJs from 'sql.js'

export default class App extends React.Component {
  render() {
    const sql = initSqlJs()
    return (
      <div className='App'>
        <FileContextContainer>
          <Dropzone />
          <DatabaseView sql={sql} />
        </FileContextContainer>
      </div>
    )
  }
}
