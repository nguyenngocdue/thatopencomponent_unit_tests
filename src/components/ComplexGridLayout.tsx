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
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(false); // Theo dõi trạng thái draggable
  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true); // Trạng thái hiển thị LeftSidebar
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true); // Trạng thái hiển thị RightSidebar

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

  // Tính toán layout dựa trên trạng thái của LeftSidebar và RightSidebar
  const layout = [
    { i: 'header', x: 0, y: 0, w: 12, h: 2, static: true }, // Header cố định
    { i: 'footer', x: 0, y: 10, w: 12, h: 2, static: true }, // Footer cố định
    ...(isLeftSidebarVisible
      ? [{ i: 'leftSidebar', x: 0, y: 0, w: 2, h: 7.5 }] // Left Sidebar
      : []),
    ...(isRightSidebarVisible
      ? [{ i: 'rightSidebar', x: isLeftSidebarVisible ? 10 : 11, y: 0, w: 2, h: 7.5 }] // Right Sidebar
      : []),
    {
      i: 'main',
      x: isLeftSidebarVisible ? 2 : 0, // MainContent bắt đầu từ 0 nếu không có LeftSidebar
      y: 0,
      w: isSmallScreen
        ? 12
        : isLeftSidebarVisible && isRightSidebarVisible
        ? 8 // Giữ khoảng giữa khi cả hai Sidebar hiển thị
        : isLeftSidebarVisible || isRightSidebarVisible
        ? 10 // Mở rộng khi một Sidebar bị ẩn
        : 12, // Toàn bộ khi cả hai Sidebar bị ẩn
      h: 7,
    },
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
          isDraggable={isDraggingEnabled} // Điều kiện hóa draggable
          compactType={null}
          preventCollision
        >
          {!isSmallScreen && isLeftSidebarVisible && (
            <div
              key="leftSidebar"
              className="draggable-handle"
              onMouseEnter={() => setIsDraggingEnabled(true)} // Kích hoạt draggable khi vào vùng Sidebar
              onMouseLeave={() => setIsDraggingEnabled(false)} // Tắt draggable khi rời vùng Sidebar
              style={{
                background: currentTheme.sidebarBg,
                cursor: 'move',
              }}
            >
              <LeftSidebar
                onClose={() => setIsLeftSidebarVisible(false)} // Đóng LeftSidebar khi nhấn nút X
                theme={currentTheme}
              />
            </div>
          )}

          <div
            key="main"
            onMouseEnter={() => setIsDraggingEnabled(true)} // Kích hoạt draggable khi vào vùng MainContent
            onMouseLeave={() => setIsDraggingEnabled(false)} // Tắt draggable khi rời vùng MainContent
            style={{
              background: currentTheme.mainBg,
              cursor: isDraggingEnabled ? 'move' : 'default', // Hiển thị mũi tên 4 chiều khi kéo
            }}
          >
            <MainContent theme={currentTheme} />
          </div>

          {!isSmallScreen && isRightSidebarVisible && (
            <div
              key="rightSidebar"
              className="draggable-handle"
              onMouseEnter={() => setIsDraggingEnabled(true)} // Kích hoạt draggable khi vào vùng Sidebar
              onMouseLeave={() => setIsDraggingEnabled(false)} // Tắt draggable khi rời vùng Sidebar
              style={{
                background: currentTheme.sidebarBg,
                cursor: 'move',
              }}
            >
              <RightSidebar
                onClose={() => setIsRightSidebarVisible(false)} // Đóng RightSidebar khi nhấn nút X
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
