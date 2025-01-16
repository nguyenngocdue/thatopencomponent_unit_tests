import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 shadow h-12 px-4">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center">
        <div className="font-semibold text-lg text-gray-800">Trimble Connect</div>
        <span className="mx-2">|</span>
        <div className="text-gray-600">Test_Model</div>
        <div className="ml-2">
          <span className="text-gray-600 text-sm">📁</span>
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        <button title="Search" className="text-gray-600 hover:text-gray-800">
          🔍
        </button>
        <button title="Help" className="text-gray-600 hover:text-gray-800">
          ❓
        </button>
        <button title="Grid View" className="text-gray-600 hover:text-gray-800">
          ⬛
        </button>
        <button title="User" className="text-gray-600 hover:text-gray-800">
          👤
        </button>
      </div>
    </div>
  );
};

export default Header;
