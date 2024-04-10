import React from 'react';
import './App.css';
import Position from './components/Position.js';
import Header from './components/Header.js';
import loadingIcon from './loading.gif';

function App() {
  const [allPositions, setAllPositions] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 15;
  const [loading, setLoading] = React.useState(false); // New state for loading indicator


  React.useEffect(() => {
    fetchPositions();
  }, [refresh]);

  const fetchPositions = () => {
    fetch(`${process.env.REACT_APP_API_URL}/position`)
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
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/position/scraper`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRefresh(!refresh))
      .catch(error => {
        console.error('Error triggering scraper:', error);
      })
      .finally(() => {
        setLoading(false)
      });
  };

  const handleTest = () => {
    fetch(`${process.env.REACT_APP_API_URL}/position/test`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.error('test', response.json());
      })
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
      <button onClick={handleClick} disabled={loading}>New search</button>
      <button onClick={handleTest} disabled={loading}>Test</button>
      {loading && <img src={loadingIcon} alt="Loading..." className='small-loading-icon'/>}
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
