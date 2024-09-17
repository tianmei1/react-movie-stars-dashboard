import React from 'react';

const ActorModal = ({ actor, onClose }) => {
  if (!actor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <div className="modal-left">
            <h2>{actor.name}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
            />
          </div>
          <div className="modal-right">
            <div className="actor-details">
              <p><strong>Gender:</strong> {actor.gender === 1 ? 'Female' : 'Male'}</p>
              <p><strong>Popularity:</strong> {actor.popularity.toFixed(3)}</p>
              {/* Known for Movies/TV Shows */}
              <p><strong>Known for:</strong></p>
              <ul>
                {actor.known_for.map((movie, index) => (
                  <li key={index}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="known-for-poster"
                    />
                    <span>{movie.title || movie.name}</span>
                  </li>
                ))}
              </ul>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ActorModal;
