import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Theme } from './ThemeColors'; // Import kiểu Theme từ ThemeColors.ts

interface RightSidebarProps {
  onClose: () => void; // Hàm được gọi khi nhấn nút đóng
  theme: Theme; // Theme hiện tại (light hoặc dark)
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onClose, theme }) => {
  return (
    <div
      className="relative h-full p-5"
      style={{
        backgroundColor: theme.sidebarBg,
        color: theme.color,
      }}
    >
      <span>Right Sidebar Content</span>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-xl hover:opacity-80 transition-opacity"
        style={{ color: theme.color }}
        aria-label="Close Sidebar"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default RightSidebar;
