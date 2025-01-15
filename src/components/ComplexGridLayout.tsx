import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import Footer from './Footer';

const ComplexGridLayout: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);  // State for Footer visibility

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeLeftSidebar = () => setShowLeftSidebar(false);
  const closeRightSidebar = () => setShowRightSidebar(false);
  const closeFooter = () => setShowFooter(false);  // Function to handle Footer close

  const layout = [
    {i: 'header', x: 0, y: 0, w: 12, h: 2, static: true},
    {i: 'leftSidebar', x: 0, y: 2, w: showLeftSidebar ? 1 : 0, h: 11, static: true},
    {i: 'main', x: showLeftSidebar ? 1 : 0, y: 2, w: 12 - (showLeftSidebar ? 1 : 0) - (showRightSidebar ? 1 : 0), h: showFooter ? 10 : 11},
    {i: 'footer', x: showLeftSidebar ? 1 : 0, y: 12, w: 12 - (showLeftSidebar ? 1 : 0) - (showRightSidebar ? 1 : 0), h: showFooter ? 1 : 0, static: true},
    {i: 'rightSidebar', x: 12 - (showRightSidebar ? 1 : 0), y: 2, w: showRightSidebar ? 1 : 0, h: 11, static: true}
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={width}
      autoSize={true}
    >
      {showLeftSidebar && <div key="leftSidebar"><LeftSidebar onClose={closeLeftSidebar} /></div>}
      <div key="header" style={{ background: '#bbb' }}>Header</div>
      <div key="main"><MainContent /></div>
      {showFooter && <div key="footer"><Footer onClose={closeFooter} /></div>}
      {showRightSidebar && <div key="rightSidebar"><RightSidebar onClose={closeRightSidebar} /></div>}
    </GridLayout>
  );
};

export default ComplexGridLayout;
