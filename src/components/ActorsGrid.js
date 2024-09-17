import React from 'react';

const ActorsGrid = ({ actors, onActorClick }) => {
  const gridClass = actors.length === 1 ? 'actors-grid center-single' : 'actors-grid';

  return (
    <div className="actor-container">      
      <h3 className="title">Celebrities</h3>
      <div className={gridClass}>
      {actors.map((actor, index) => (
        <div className="actor-card" key={`${actor.id}-${index}`} onClick={() => onActorClick(actor)}>
          <div className="priority-number">{actor.popularity.toFixed(0)}</div>
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
          />
          <div className="actor-info">
            <h3>{actor.name}</h3>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ActorsGrid;
