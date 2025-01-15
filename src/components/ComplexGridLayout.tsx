import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import Footer from './Footer';

const ComplexGridLayout: React.FC = () => {
  const layout = [
    {i: 'header', x: 0, y: 0, w: 12, h: 2, static: true},
    {i: 'leftSidebar', x: 0, y: 2, w: 1, h: 11, static: true},
    {i: 'main', x: 1, y: 2, w: 10, h: 10, static: true},
    {i: 'footer', x: 1, y: 12, w: 10, h: 1, static: true},
    {i: 'rightSidebar', x: 11, y: 2, w: 1, h: 11, static: true}
  ];

  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
      <div key="leftSidebar"><LeftSidebar /></div>
      <div key="header" style={{ background: '#bbb' }}>Header</div>
      <div key="main"><MainContent /></div>
      <div key="footer"><Footer /></div>
      <div key="rightSidebar"><RightSidebar /></div>
    </GridLayout>
  );
};

export default ComplexGridLayout;
