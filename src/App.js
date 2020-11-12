import React from 'react'
import Present from './components/Present'
import SnowStorm from 'react-snowstorm'
import './App.css'

function App() {
  return (<>
      <header className="App-header">
        <SnowStorm />
        <Present />
      </header>
      <main className="App-main">
        <h1>Seasons Greetings</h1>
      </main>
      <footer className="App-footer">

      </footer>
    </>)
}

export default App;
