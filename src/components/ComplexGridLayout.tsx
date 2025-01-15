import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import Footer from './Footer';

const ComplexGridLayout: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerHeight = 60; // Chiều cao Header (px)
  const footerHeight = 60; // Chiều cao Footer (px)
  const rowHeight = (window.innerHeight - headerHeight - footerHeight) / 8; // Chia đều cho 8 hàng
  const margin = [10, 10]; // Khoảng cách giữa các phần tử: [dọc, ngang]

  // Layout configuration
  const layout = [
    { i: 'header', x: 0, y: 0, w: 12, h: 2, static: true }, // Header cố định
    { i: 'footer', x: 0, y: 10, w: 12, h: 2, static: true }, // Footer cố định
    { i: 'leftSidebar', x: 0, y: 0, w: 2, h: 7.15,  }, // Resize từ cạnh phải
    { i: 'main', x: 2, y: 0, w: 8, h: 6 }, // Resize từ cạnh trái và phải
    { i: 'rightSidebar', x: 10, y: 0, w: 2, h: 7.15}, // Resize từ cạnh trái
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, height: `${headerHeight}px`, background: '#4A90E2', zIndex: 10 }}>
        <Header />
      </div>

      {/* Main Area */}
      <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={rowHeight}
          width={width}
          margin={margin} // Khoảng cách giữa các phần tử
          autoSize={true}
          isResizable={true} // Cho phép resize
          isDraggable={true} // Cho phép kéo thả
          compactType={null} // Không tự động điều chỉnh các phần tử
          preventCollision={true} // Ngăn các thành phần chồng chéo
        >
          {/* Left Sidebar */}
          <div key="leftSidebar" className="bg-blue-500 text-white h-full">
            <LeftSidebar />
          </div>

          {/* Main Content */}
          <div key="main" className="bg-white text-gray-800">
            <MainContent />
          </div>

          {/* Right Sidebar */}
          <div key="rightSidebar" className="bg-blue-500 text-white h-full">
            <RightSidebar />
          </div>
        </GridLayout>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, height: `${footerHeight}px`, background: '#4A90E2', zIndex: 10 }}>
        <Footer />
      </div>
    </div>
  );
};

export default ComplexGridLayout;
