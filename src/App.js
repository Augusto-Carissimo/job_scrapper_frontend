import React from 'react';
import logo from './logo.svg';
import './App.css';
import Position from './Position.js'

function App() {
  const [allPosition, setAllPosition] = React.useState([])

  React.useEffect(() => {
    window.fetch('/position')
      .then(response => response.json())
      .then(data => setAllPosition(data))
  }, [])

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
      {positions}
    </div>
  )
}

export default App;
