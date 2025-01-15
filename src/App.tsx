import React from 'react';
import ComplexGridLayout from './components/ComplexGridLayout';
import './App.css';
import { ThemeProvider } from './components/ThemeContext';


function App() {
  return (
    <ThemeProvider>
      <ComplexGridLayout />
    </ThemeProvider>
  );
}

export default App;
