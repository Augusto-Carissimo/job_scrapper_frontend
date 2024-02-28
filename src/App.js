import React from 'react';
import './App.css';
import Position from './components/Position.js'
import Header from './components/Header.js'

function App() {
  function handleClick() {
    window.fetch('/position/scraper')
  }

  const [allPosition, setAllPosition] = React.useState([])

  React.useEffect(() => {
    window.fetch('/position')
      .then(response => response.json())
      .then(data => setAllPosition(data))
  }, [handleClick])

  const positions = allPosition.map(position => {
    return (
      <Position
        key={position.id}
        {...position}
      />
    )
  })

  return (
    <div>
      <button onClick={handleClick}> New search </button>
      <table>
        <Header/>
        <tbody>
          {positions}
        </tbody>
      </table>
    </div>
  )
}

export default App;
