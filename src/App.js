import React from 'react';
import Routes from './routes';
import ButtonAppBar from './components/navbar';

import './App.css';

function App() {
  return (
    <div>
      <ButtonAppBar />
      <Routes />
    </div>
  );
}

export default App;
