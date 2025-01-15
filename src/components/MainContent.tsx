import React from 'react';
import TabViewWithAutoLayout from './TabViewWithAutoLayout';
import { Theme } from './ThemeColors'; // Import kiểu Theme từ ThemeColors.ts

interface MainContentProps {
  theme: Theme; // Theme hiện tại (light hoặc dark)
}

const MainContent: React.FC<MainContentProps> = ({ theme }) => {
  return (
    <div
      className="rounded-lg shadow-md"
      style={{
        backgroundColor: theme.mainBg,
        color: theme.color,
      }}
    >
      <TabViewWithAutoLayout />
    </div>
  );
};

export default MainContent;
