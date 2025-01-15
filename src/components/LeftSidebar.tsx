import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Theme } from './ThemeColors'; // Import kiểu Theme từ ThemeColors.ts

interface LeftSidebarProps {
  onClose: () => void; // Hàm được gọi khi nhấn nút đóng
  theme: Theme; // Theme hiện tại (light hoặc dark)
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onClose, theme }) => {
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(false); // Theo dõi trạng thái con trỏ

  return (
    <div
      className="relative h-full p-5"
      style={{
        backgroundColor: theme.sidebarBg,
        color: theme.color,
        cursor: isDraggingEnabled ? 'move' : 'default', // Thay đổi con trỏ
      }}
      onMouseEnter={() => setIsDraggingEnabled(true)} // Kích hoạt khi vào vùng sidebar
      onMouseLeave={() => setIsDraggingEnabled(false)} // Vô hiệu hóa khi rời vùng sidebar
    >
      <span>Left Sidebar Content</span>
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

export default LeftSidebar;
