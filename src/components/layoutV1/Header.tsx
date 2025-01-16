import { FaFolder, FaQuestionCircle, FaUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { TiThLarge } from "react-icons/ti";

const Header: React.FC = () => {
  const iconSize = 24;
  const bgColor = "bg-white";

  return (
    <div className={`flex items-center justify-between ${bgColor} shadow h-16 px-4`}>
      {/* Left Section: Logo and Title */}
      <div className="flex items-center">
        {/* Logo */}
        <div className="font-semibold text-lg text-gray-800 px-2">
          <a href="#">
            <img
              src="https://web.connect.trimble.com/assets/img/trimbleconnect_header.svg"
              className="h-full w-full"
            />
          </a>
        </div>

        {/* Vertical Divider */}
        <div className="border-r h-10 border-gray-300"></div>

        {/* Title */}
        <div className="text-gray-600 px-2">
          <span className="text-lg">Test_Model</span>
        </div>
        {/* Icon */}
        <div className="ml-2 text-gray-600 text-lg">
          <span>
            <FaFolder size={iconSize} />
          </span>
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        <button title="Search" className="text-gray-600 hover:text-gray-800">
          <IoSearchSharp  size={iconSize}/>
        </button>
        <button title="Help" className="text-gray-600 hover:text-gray-800">
          <FaQuestionCircle size={iconSize}/>
        </button>
        <button title="Grid View" className="text-gray-600 hover:text-gray-800">
          <TiThLarge  size={iconSize}/>
        </button>
        <button title="User" className="text-gray-600 hover:text-gray-800">
          <FaUser size={iconSize}/>
        </button>
      </div>
    </div>
  );
};

export default Header;
