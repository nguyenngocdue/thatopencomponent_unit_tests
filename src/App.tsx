import React from 'react';
import ComplexGridLayout from './components/ComplexGridLayout';
import './App.css';
import { ThemeProvider } from './components/ThemeContext';
import Test from './components/Test';
import FaceSelection from './components/selection/PickFace';
import BoxIndexSelection from './components/selection/PickObject';


function App() {
  return (
    <ThemeProvider>
      {/* <ComplexGridLayout /> */}
      <BoxIndexSelection/>
    </ThemeProvider>
  );
}

export default App;
