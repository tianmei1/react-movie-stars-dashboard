// src/App.js
import React, { useState, useEffect } from 'react';
import ActorsGrid from './components/ActorsGrid';
import ActorModal from './components/ActorModal';
import Navbar from './components/Navbar';
import './App.css';
import { searchActors, fetchPopularActors } from './api/tmdb';

const App = () => {
  const [selectedActor, setSelectedActor] = useState(null);
  const [actors, setActors] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track loading state

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
        loading
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1); // Increment page number when bottom is reached
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Load popular actors when the component mounts
  useEffect(() => {
    fetchPopularActors().then((response) => setActors(response.data.results));
  }, []);

  // Handle search and replace the current actor list with search results
  const handleSearch = (query) => {
    if (query) {
      searchActors(query).then((response) => {
        console.log('Search results:', response.data.results); // Log the response to debug
        setActors(response.data.results);
      }).catch((error) => {
        console.error('Search API error:', error);
      });
      // searchActors(query).then((response) => setActors(response.data.results));
    } else {
      // If no query, revert back to the popular actors
      fetchPopularActors().then((response) => setActors(response.data.results));
    }
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />
      <main>
        {actors.length > 0 ? (
          <ActorsGrid actors={actors} onActorClick={setSelectedActor} />
        ) : (
          <p>No actors found.</p>
        )}
        {loading && <p>Loading more actors...</p>} 
      </main>

      {selectedActor && (
        <ActorModal actor={selectedActor} onClose={() => setSelectedActor(null)} />
      )}
    </div>
  );
};

export default App;
