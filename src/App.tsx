import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

import Test from './components/UnitTests/Test';
import TrimbleConnectViewer from './TrimbleConnectViewer';

import ClippingGeometryTest from './components/UnitTests/ClippingGeometryTest';

const tests = {
  clipping_geometry: ClippingGeometryTest,
  test2: Test,
}

function DynamicTest () {
  const {testId} = useParams();
  const TestComponent = testId ? tests[testId.toLowerCase() as keyof typeof tests] :  null;
  if (!TestComponent) {
    return <div>Test not found</div>
  }
  return <TestComponent/>
}


function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/unit_tests/:testId" element={<DynamicTest/>} />
          <Route path="/trimble_connect_viewer" element={<TrimbleConnectViewer/>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
