import React, { useContext, useState, useEffect } from 'react'
import { FileContext } from './FileContext'

const DatabaseView = ({ sql }) => {
  const [file] = useContext(FileContext)
  const [db, setDB] = useState(undefined)
  const [err, setErr] = useState(undefined)
  const [results, setResults] = useState(undefined)

  useEffect(() => {
    if (file && sql && !db) {
      sql
        .then((SQL) => setDB(new SQL.Database(file)))
        .catch((err) => setErr(err))
    }
  }, [file])

  function exec(sql) {
    let results = undefined
    let err = undefined
    try {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker
      results = db.exec(sql) // an array of objects is returned
    } catch (e) {
      // exec throws an error when the SQL statement is invalid
      err = e
    }
    setResults(results)
    setErr(err)
  }

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  function renderResult({ columns, values }) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((columnName) => (
              <td key={columnName}>{columnName}</td>
            ))}
          </tr>
        </thead>

        <tbody>
          {values.map((
            row // values is an array of arrays representing the results of the query
          ) => (
            <tr key={row.toString()}>
              {row.map((value) => (
                <td key={value}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  if (!db) return <pre>Loading...</pre>
  return (
    <div className='SQLite'>
      <h1>React SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder='Enter some SQL. No inpiration ? Try “select sqlite_version()”'
      ></textarea>

      <pre className='error'>{(err || '').toString()}</pre>

      <pre>
        {results
          ? results.map(renderResult) // results contains one object per select statement in the query
          : ''}
      </pre>
    </div>
  )
}

export default DatabaseView
