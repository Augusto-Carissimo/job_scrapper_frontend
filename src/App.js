import React from 'react';
import './App.css';
import Position from './components/Position.js';
import Header from './components/Header.js';

function App() {
  const [allPositions, setAllPositions] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 15;

  React.useEffect(() => {
    fetchPositions();
  }, [refresh]);

  const fetchPositions = () => {
    fetch('http://localhost:3001/position')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAllPositions(data))
      .catch(error => {
        console.error('Error fetching positions:', error);
      });
  };

  const handleClick = () => {
    fetch('http://localhost:3001/position/scraper')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRefresh(!refresh))
      .catch(error => {
        console.error('Error triggering scraper:', error);
      });
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(allPositions.length / itemsPerPage)));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const positionsOnPage = allPositions.slice(startIndex, endIndex);


  const positions = positionsOnPage.map(position => (
    <Position
      key={position.id}
      {...position}
    />
  ));

  return (
    <div>
      <button onClick={handleClick}>New search</button>

      <table>
        <Header />
        <tbody>
          {positions}
        </tbody>
      </table>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
      <button onClick={handleNextPage} disabled={currentPage === Math.ceil(allPositions.length / itemsPerPage)}>Next</button>
    </div>
  );
}

export default App;
