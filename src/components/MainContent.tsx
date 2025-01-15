import React from 'react';
import TabViewWithAutoLayout from './TabViewWithAutoLayout';

const MainContent: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 p-5 m-5 rounded-lg shadow-md">
     <TabViewWithAutoLayout/>
    </div>
  );
};

export default MainContent;
