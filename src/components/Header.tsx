import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onClose }) => {
  return (
    <div className="bg-blue-500 text-white relative px-5 py-3 text-lg flex items-center">
      <span>Header Content</span>
      <div className="absolute top-0 right-0 w-12 h-full flex items-center justify-center z-50">
        <button
          onClick={() => {
            console.log('Close button clicked');
            onClose(); // Gọi hàm onClose từ props
          }}
          className="text-white text-xl hover:opacity-80 transition-opacity duration-200"
          aria-label="Close Header"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default Header;
