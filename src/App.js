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
  const [query, setQuery] = useState(''); // Track the search query
  const [hasMore, setHasMore] = useState(true); // Track if there are more results
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load to prevent double fetching

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
        !loading && hasMore
      ) {
        setPage((prevPage) => prevPage + 1); // Increment page number when bottom is reached
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Fetch actors based on the query and page
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      
      try {
        let response;
        if (query) {
          response = await searchActors(query, page);
        } else {
          response = await fetchPopularActors(page);
        }

        // Append the new actors to the existing ones
        setActors((prevActors) => [...prevActors, ...response.data.results]);

        // If no more results are returned, stop further requests
        if (response.data.results.length === 0) {
          setHasMore(false);
        } else {
          // Check if the content height is smaller than the window height
          if (document.documentElement.scrollHeight <= window.innerHeight && hasMore && !query) {
            setPage((prevPage) => prevPage + 1); // Load another page if the content doesn't fill the screen
          }
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
        setHasMore(false); // Stop further requests in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, query, initialLoad, hasMore]);

  // Handle search and reset the state
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1); // Reset page count
    setActors([]); // Clear previous actors
    setHasMore(true); // Reset hasMore flag for new searches
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
