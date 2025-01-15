import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Theme } from './ThemeColors'; // Import kiểu theme từ ThemeColors.ts

interface FooterProps {
  onClose: () => void; // Hàm được gọi khi nhấn nút đóng
  theme: Theme; // Theme hiện tại (light hoặc dark)
}

const Footer: React.FC<FooterProps> = ({ onClose, theme }) => {
  return (
    <footer
      className={`relative px-5 py-3 shadow-md`}
      style={{
        backgroundColor: theme.headerFooterBg,
        color: theme.color,
      }}
    >
      <p>Footer Content</p>
      <button
        onClick={onClose}
        className="absolute top-2 right-5 text-xl hover:opacity-80 transition-opacity"
        style={{ color: theme.color }}
        aria-label="Close Footer"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </footer>
  );
};

export default Footer;
