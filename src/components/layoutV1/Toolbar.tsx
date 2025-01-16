import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUndo,
  faMousePointer,
  faExpand,
  faSquare,
  faCut,
  faCamera,
  faEye,
  faQuestionCircle,
  faCog,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";

const Toolbar: React.FC = () => {
  const buttons = [
    { icon: faArrowLeft, label: "Back" },
    { icon: faUndo, label: "Undo" },
    { icon: faMousePointer, label: "Select" },
    { icon: faSquare, label: "Bounding Box" },
    { icon: faExpand, label: "Expand" },
    { icon: faCut, label: "Cut" },
    { icon: faCamera, label: "Camera" },
    { icon: faEye, label: "View" },
    { icon: faQuestionCircle, label: "Help" },
    { icon: faCog, label: "Settings" },
    { icon: faCompress, label: "Compress" },
  ];

  return (
    <div className="flex items-center bg-gray-100 h-12 px-4 shadow">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="flex items-center justify-center w-10 h-10 mx-1 hover:bg-gray-200 rounded"
          title={button.label}
        >
          <FontAwesomeIcon icon={button.icon} className="text-gray-700" />
        </button>
      ))}
      <button className="text-blue-600 ml-2">Reset model</button>
    </div>
  );
};

export default Toolbar;
