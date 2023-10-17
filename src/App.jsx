import React, { useState, useEffect } from 'react'
import Cards from './Components/Cards'
import './App.css'
import Welcome from './Components/Welcome'
import axios from 'axios';
import confetti from 'canvas-confetti'

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); 
  const [errors, setErrors] = useState(0); 
  const [matches, setMatches] = useState(0); 
  const [images, setImages] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
      )
      .then((response) => {
        setImages(response.data.entries);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleNameSubmit = (name) => {
    localStorage.setItem('username', name);
    setUsername(name);
  };

  const handleMatch = () => {
    setMatches(matches + 1);
  };

  const handleMismatch = () => {
    setErrors(errors + 1);
  };

  useEffect(() => {
    if (matches === images.length && matches != 0) {
      // Configurar el confeti y hacerlo aparecer cuando el juego se completa
      confetti({
        particleCount: 200,
        startVelocity: 30,
        gravity: 0.5,
        startVelocity:70, 
        origin: { y: 1 }
      });
    }
  }, [matches, images.length]);

  return (
    <div className='App'>
      {username ? (
        <Cards onMatch={handleMatch} onMismatch={handleMismatch} matches={matches} errors={errors} />
      ) : (
        <Welcome onNameSubmit={handleNameSubmit} />
      )}
      {matches === images.length && (
        <div className="congratsStyles">
          Congratulations, {username}! You won the game!
        </div>
      )}
    </div>
  );
}

export default App;
