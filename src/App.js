import React, { useState } from 'react';
import './index.css';
import Position from './components/Position.js';
import Header from './components/Header.js';
import Banner from './components/Banner.js';
import loadingIcon from './loading.gif';

function App() {
  const [allPositions, setAllPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  const fetchPositions = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/position`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAllPositions(data);
      })
      .catch(error => {
        console.error('Error fetching positions:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchPositions();
  }, []);

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
    <div className="container">
      < Banner />
      <div class="table-container">
        <table className='table'>
          <thead>
            <Header />
          </thead>
          {loading && <img src={loadingIcon} alt="Loading..." className='small-loading-icon'/>}
          <tbody>
            {positions}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(allPositions.length / itemsPerPage)}>Next</button>
      </div>
    </div>
  );
}

export default App;
