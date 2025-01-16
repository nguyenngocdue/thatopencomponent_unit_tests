import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/layoutV1/Sidebar';
import Viewer from './components/layoutV1/Viewer';
import Header from './components/layoutV1/Header';
import Toolbar from './components/layoutV1/Toolbar';
import { Grid } from './components/Grid';
import Panel from './components/layoutV1/Panel';


function App() {
  const [content, setContent] = useState<string | null>(null);

  return (
    <>
      <div>
        <header>
          <Header />
        </header>
        <div>
          <main className="w-full">
            {/* Row 1 */}
            <div className="grid grid-rows-1">
              <div className="grid grid-cols-12 h-10">
                <div className="col-span-12">
                  <Toolbar/>
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="grid grid-rows-1">
              <div className="grid grid-cols-12 h-full">
                <div className="col-span-3">

                <Sidebar onSelect={(label) => setContent(label)} />

<div className="flex-1 bg-gray-50">
  <Panel content={content} />
</div>



                </div>
                <div className="col-span-9 relative">
                  <Grid/>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
