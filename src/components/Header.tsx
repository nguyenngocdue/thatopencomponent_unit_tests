import React from 'react';

interface Props {
  onClose: () => void; // Prop để xử lý việc đóng Header
}

const Header: React.FC<Props> = ({ onClose }) => {
  return (
    <div style={{ background: '#bbb', position: 'relative', width: '100%', height: '100%' }}>
      Header
      <button onClick={onClose} style={{ position: 'absolute', top: 0, right: 0 }}>
        Close
      </button>
    </div>
  );
};

export default Header;
