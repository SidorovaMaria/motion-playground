import React from "react";
type TagProps = {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
};
const Tag = ({ text, icon, className }: TagProps) => {
  const Icon = icon;
  return (
    <div
      className={`inline-flex items-center px-4 py-2 bg-gradient-to-br from-background to-primary/50 border- border-foreground/10 rounded-full text-foreground text-xs cursor-default transition ${className}`}
    >
      {Icon && <Icon className="mr-2 text-yellow-400 icon" />}
      {text}
    </div>
  );
};

export default Tag;
