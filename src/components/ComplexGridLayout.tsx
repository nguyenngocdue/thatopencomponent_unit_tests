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
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Trạng thái cho thiết bị di động

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 768); // Cập nhật trạng thái dựa trên chiều rộng màn hình
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeHeader = () => setShowHeader(false);
  const closeLeftSidebar = () => setShowLeftSidebar(false);
  const closeRightSidebar = () => setShowRightSidebar(false);
  const closeFooter = () => setShowFooter(false);

  const headerHeight = showHeader ? 2 : 0;
  const layout = [
    {i: 'header', x: 0, y: 0, w: 12, h: headerHeight, static: true},
    {i: 'leftSidebar', x: 0, y: headerHeight, w: showLeftSidebar && !isMobile ? 1 : 0, h: 11, static: true},
    {i: 'main', x: (showLeftSidebar && !isMobile) ? 1 : 0, y: headerHeight, w: 12 - ((showLeftSidebar && !isMobile) ? 1 : 0) - ((showRightSidebar && !isMobile) ? 1 : 0), h: showFooter ? 10 : 11},
    {i: 'footer', x: (showLeftSidebar && !isMobile) ? 1 : 0, y: 12 + (showHeader ? 0 : -2), w: 12 - ((showLeftSidebar && !isMobile) ? 1 : 0) - ((showRightSidebar && !isMobile) ? 1 : 0), h: showFooter ? 1 : 0, static: true},
    {i: 'rightSidebar', x: 12 - ((showRightSidebar && !isMobile) ? 1 : 0), y: headerHeight, w: showRightSidebar && !isMobile ? 1 : 0, h: 11, static: true}
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={width}
      autoSize={true}
      isResizable={true}
      isDraggable={true}
    >
      {showHeader && <div key="header"><Header onClose={closeHeader} /></div>}
      {showLeftSidebar && !isMobile && <div key="leftSidebar"><LeftSidebar onClose={closeLeftSidebar} /></div>}
      <div key="main"><MainContent /></div>
      {showFooter && <div key="footer"><Footer onClose={closeFooter} /></div>}
      {showRightSidebar && !isMobile && <div key="rightSidebar"><RightSidebar onClose={closeRightSidebar} /></div>}
    </GridLayout>
  );
};

export default ComplexGridLayout;
