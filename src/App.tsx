import React from 'react';
import ComplexGridLayout from './components/ComplexGridLayout';
import './App.css';
import { ThemeProvider } from './components/ThemeContext';
import PhongMaterialExample from './components/shaders/PhongMaterialExample';
import InteractiveCubes from './components/selection/InteractiveCubes';



function App() {
  return (
    <ThemeProvider>
      {/* <ComplexGridLayout /> */}
      {/* <SimpleWaveEffect/> */}
      {/* <GradientBox/> */}
      {/* <PhongMaterialExample/> */}
      <InteractiveCubes/>
    </ThemeProvider>
  );
}

export default App;
