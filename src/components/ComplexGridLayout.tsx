import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import { lightTheme, darkTheme, Theme } from './ThemeColors';

const ComplexGridLayout: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Kiểm tra màn hình nhỏ
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Trạng thái theme (sáng/tối)

  const currentTheme: Theme = isDarkTheme ? darkTheme : lightTheme; // Sử dụng theme từ ThemeColors.ts

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setIsSmallScreen(window.innerWidth < 768); // Cập nhật trạng thái màn hình nhỏ
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerHeight = 60; // Chiều cao Header (px)
  const footerHeight = 50; // Chiều cao Footer (px)
  const rowHeight = (window.innerHeight - headerHeight - footerHeight) / 8; // Chia đều cho 8 hàng
  const margin = [10, 10]; // Khoảng cách giữa các phần tử: [dọc, ngang]

  const layout = [
    { i: 'header', x: 0, y: 0, w: 12, h: 2, static: true }, // Header cố định
    { i: 'footer', x: 0, y: 10, w: 12, h: 2, static: true }, // Footer cố định
    ...(isSmallScreen
      ? []
      : [
        { i: 'leftSidebar', x: 0, y: 0, w: 2, h: 7.5 }, // Left Sidebar
        { i: 'rightSidebar', x: 10, y: 0, w: 2, h: 7.5 }, // Right Sidebar
      ]),
    { i: 'main', x: 2, y: 0, w: isSmallScreen ? 12 : 8, h: 7 }, // Main Content chiếm toàn bộ chiều rộng khi màn hình nhỏ
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: currentTheme.background,
        color: currentTheme.color,
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          height: `${headerHeight}px`,
          background: currentTheme.headerFooterBg,
          zIndex: 10,
          position: 'relative',
        }}
      >
        <Header
          onToggleTheme={() => setIsDarkTheme((prev) => !prev)}
          isDarkTheme={isDarkTheme}
          theme={currentTheme}
        />
      </div>
  
      {/* Main Area */}
      <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={rowHeight}
          width={width}
          margin={margin}
          autoSize
          isResizable
          isDraggable
          compactType={null}
          preventCollision
        >
          {!isSmallScreen && (
            <div
              key="leftSidebar"
              style={{
                background: currentTheme.sidebarBg,
              }}
            >
              <LeftSidebar
                onClose={() => console.log('Left Sidebar closed')}
                theme={currentTheme}
              />
            </div>
          )}
  
          <div
            key="main"
            style={{
              background: currentTheme.mainBg,
            }}
          >
            <MainContent theme={currentTheme} />
          </div>
  
          {!isSmallScreen && (
            <div
              key="rightSidebar"
              style={{
                background: currentTheme.sidebarBg,
              }}
            >
              <RightSidebar
                onClose={() => console.log('Right Sidebar closed')}
                theme={currentTheme}
              />
            </div>
          )}
        </GridLayout>
      </div>
  
      {/* Footer */}
      <div
        style={{
          flexShrink: 0,
          height: `${footerHeight}px`,
          background: currentTheme.headerFooterBg,
          zIndex: 10,
          position: 'relative',
        }}
      >
        <Footer theme={currentTheme} />
      </div>
    </div>
  );
  
};

export default ComplexGridLayout;
