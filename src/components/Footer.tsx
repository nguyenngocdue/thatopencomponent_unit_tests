import React from 'react';

interface Props {
  onClose: () => void; // Prop để xử lý việc đóng Footer
}

const Footer: React.FC<Props> = ({ onClose }) => {
  return (
    <div style={{ background: '#eee', position: 'relative', width: '100%', height: '100%' }}>
      Footer
      <button onClick={onClose} style={{ position: 'absolute', top: 0, right: 0 }}>
        Close
      </button>
    </div>
  );
};

export default Footer;
