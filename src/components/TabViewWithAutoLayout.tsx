import React, { useState } from 'react';
import { Cube } from './Cube';
import { Grid } from './Grid';

const TabViewWithAutoLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('View1'); // Tab đang được chọn
  const [isAutoLayout, setIsAutoLayout] = useState(false); // Trạng thái tự động sắp xếp

  const views = [
    { id: 'View1', content: 'This is the content of View 1.' },
    { id: 'View2', content: 'This is the content of View 2.' },
    { id: 'View3', content: 'This is the content of View 3.' },
    { id: 'View4', content: 'This is the content of View 4.' },
  ];

  const renderTabs = () => (
    <div style={{ display: 'flex', backgroundColor: '#007bff', padding: '10px', color: 'white' }}>
      {views.map((view) => (
        <div
          key={view.id}
          style={{
            marginRight: '10px',
            cursor: 'pointer',
            padding: '5px 10px',
            backgroundColor: activeTab === view.id ? '#0056b3' : 'transparent',
            borderRadius: '5px',
          }}
          onClick={() => setActiveTab(view.id)}
        >
          {view.id}
        </div>
      ))}
      <div
        style={{
          marginLeft: 'auto',
          cursor: 'pointer',
          padding: '5px 10px',
          backgroundColor: '#28a745',
          borderRadius: '5px',
        }}
        onClick={() => setIsAutoLayout(!isAutoLayout)}
      >
        {isAutoLayout ? 'Switch to Tab View' : 'Auto Layout'}
      </div>
    </div>
  );

  const renderContent = () => {
    if (isAutoLayout) {
      // Chế độ Auto Layout (Grid Layout)
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '10px',
            padding: '10px',
            height: '100%',
          }}
        >
          {views.map((view) => (
            <div
              key={view.id}
              style={{
                border: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <h2>{view.id}</h2>
              <p>{view.content}</p>
            </div>
          ))}
        </div>
      );
    } else {
      // Chế độ Tab View
      const activeView = views.find((view) => view.id === activeTab);
      return (
        <div style={{ padding: '10px', backgroundColor: '#f9f9f9', height: '100%' }}>
          {/* <h2>{activeView?.id}</h2> */}
          {/* <p>{activeView?.content}</p> */}
          <Grid/>
        </div>
      );
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Tab Bar */}
      {renderTabs()}

      {/* Content Area */}
      <div style={{ flexGrow: 1, overflow: 'auto' }}>{renderContent()}</div>
    </div>
  );
};

export default TabViewWithAutoLayout;
