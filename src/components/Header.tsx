import React from 'react';
import { Theme } from './ThemeColors';

interface HeaderProps {
  onToggleTheme: () => void;
  isDarkTheme: boolean;
  theme: Theme;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme, isDarkTheme, theme }) => {
  return (
    <header
      className="relative text-center p-3"
      style={{
        backgroundColor: theme.headerFooterBg,
        color: theme.color,
      }}
    >
      <h1 className="text-xl font-bold">Complex Grid Layout</h1>
      <button
        onClick={onToggleTheme}
        className="absolute top-2 right-5 px-4 py-2 rounded-lg shadow-md transition-opacity duration-200 hover:opacity-80"
        style={{
          backgroundColor: theme.buttonBg,
          color: theme.buttonText,
        }}
      >
        {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button>
    </header>
  );
};

export default Header;
