import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const RightSidebar = ({ onClose }) => {
  return (
    <div className="bg-blue-500 text-white relative h-full p-5">
      <span>Right Sidebar Content</span>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-xl hover:opacity-80 transition-opacity"
        aria-label="Close Sidebar"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default RightSidebar;
