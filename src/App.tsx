import React from 'react';
import ComplexGridLayout from './components/ComplexGridLayout';
import './App.css';
import { ThemeProvider } from './components/ThemeContext';
import PhongMaterialExample from './components/shaders/PhongMaterialExample';



function App() {
  return (
    <ThemeProvider>
      {/* <ComplexGridLayout /> */}
      {/* <SimpleWaveEffect/> */}
      {/* <GradientBox/> */}
      <PhongMaterialExample/>
    </ThemeProvider>
  );
}

export default App;
