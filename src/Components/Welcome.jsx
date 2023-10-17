import React, { useState } from 'react';

const Welcome = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleNameSubmit = () => {
    onNameSubmit(name);
  };

  return (
    <div className="welcome">
      <h1>Welcome to the Concentration Game</h1>
      <p>Please enter your name to start the game:</p>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleNameSubmit}>Start Game</button>
    </div>
  );
};

export default Welcome;
