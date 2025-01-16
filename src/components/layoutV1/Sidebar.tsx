import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faLayerGroup,
  faLink,
  faClipboardCheck,
  faCamera,
  faRulerCombined,
  faTable,
  faGlobe,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC<{ onSelect: (content: string | null) => void }> = ({ onSelect }) => {
  const menuItems = [
    { icon: faCube, label: "3D Model" },
    { icon: faLayerGroup, label: "Layers" },
    { icon: faLink, label: "Links" },
    { icon: faClipboardCheck, label: "Tasks" },
    { icon: faCamera, label: "Camera" },
    { icon: faRulerCombined, label: "Measure" },
    { icon: faTable, label: "Tables" },
    { icon: faGlobe, label: "Global View" },
    { icon: faCogs, label: "Settings" },
  ];

  const [selected, setSelected] = useState<string | null>(null);

  const handleItemClick = (label: string) => {
    if (selected === label) {
      setSelected(null); // Ẩn panel nếu nhấp lại vào mục đã chọn
      onSelect(null);
    } else {
      setSelected(label); // Hiển thị panel mới
      onSelect(label);
    }
  };

  return (
    <div className="w-20 bg-gray-100 h-full shadow flex flex-col items-center py-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleItemClick(item.label)}
          className={`w-12 h-12 mb-4 flex items-center justify-center hover:bg-gray-200 rounded ${
            selected === item.label ? "bg-gray-300" : ""
          }`}
          title={item.label}
        >
          <FontAwesomeIcon icon={item.icon} className="text-gray-700" />
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
