import React from 'react';

interface Props {
  onClose: () => void;  // Thêm prop cho hàm đóng
}

const RightSidebar: React.FC<Props> = ({ onClose }) => {
  return (
    <div style={{ background: '#ddd', height: '100%', position: 'relative' }}>
      Right Sidebar
      <button onClick={onClose} style={{ position: 'absolute', top: 0, right: 0 }}>
        Close
      </button>
    </div>
  );
};

export default RightSidebar;
