import React from "react";

const Panel: React.FC<{ content: string | null }> = ({ content }) => {
  if (!content) return null; // Không hiển thị gì nếu không có nội dung

  return (
    <div className="w-full bg-white h-full shadow p-4">
      <h2 className="text-lg font-bold mb-4">{content}</h2>
      <p>This is the content for {content}.</p>
    </div>
  );
};

export default Panel;
