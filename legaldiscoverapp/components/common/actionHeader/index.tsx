import React from "react";

interface ActionHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const ActionHeader: React.FC<ActionHeaderProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <div className="sm:mb-[0px] mb-[10px]">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  );
};
