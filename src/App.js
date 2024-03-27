import React from 'react';
import './App.css';
import Position from './components/Position.js'
import Header from './components/Header.js'

function App() {

  const [allPosition, setAllPosition] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
  console.log(refresh)

  React.useEffect(() => {
    window.fetch('https://job-scrapper-api.onrender.com/position')
      .then(response => response.json())
      .then(data => setAllPosition(data))
  }, [refresh])

  const positions = allPosition.map(position => {
    return (
      <Position
        key={position.id}
        {...position}
      />
    )
  })

  function handleClick() {
    window.fetch('https://job-scrapper-api.onrender.com/position/scraper')
      .then(response => response.json())
      .then(data => setRefresh(data))

  }

  return (
    <div>
      <button onClick={handleClick}> New search </button>
      <table>
        <Header />
        <tbody>
          {positions}
        </tbody>
      </table>
    </div>
  )
}

export default App;
