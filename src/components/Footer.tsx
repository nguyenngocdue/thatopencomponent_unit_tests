import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ onClose }) => {
  return (
    <div className="bg-blue-500 text-white relative px-5 py-3 shadow-md">
      <p>Footer Content</p>
      <button
        onClick={onClose}
        className="absolute top-2 right-5 text-white text-xl hover:opacity-80 transition-opacity"
        aria-label="Close Footer"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Footer;
