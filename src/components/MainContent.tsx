import React from 'react';

const MainContent: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 p-5 m-5 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Main Content</h1>
      <p className="text-base">
        This is the main area of the application where the user interacts with the majority of the content. It's styled to ensure that the focus remains on the user's tasks, enhanced with readability and aesthetic appeal.
      </p>
    </div>
  );
};

export default MainContent;
