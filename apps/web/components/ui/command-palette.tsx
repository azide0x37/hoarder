// File: apps/web/components/ui/command-palette.tsx

import React, { useState } from 'react';
import styles from './CommandPalette.module.css';

const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [command, setCommand] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      onClose();
    } else if (event.key === 'Enter') {
      handleCommand();
    }
  };

  const handleCommand = () => {
    if (command === 'query') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // Implement the query command logic here
    console.log('Query:', input);
    // Example: Redirect to search results page
    window.location.href = `/search?q=${encodeURIComponent(input)}`;
    onClose();
  };

  return (
    <div className={styles.commandPalette}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a command..."
        autoFocus
      />
      <div className={styles.commandList}>
        <button onClick={() => setCommand('query')}>Query</button>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CommandPalette;