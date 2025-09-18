import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";
type Props = {
  href?: string;
  title: string;
  description: string;
};
const PropsListItem = ({ href, title, description }: Props) => {
  return (
    <li className="font-sans font-bold text-base ">
      <span className="text-accent font-display">{title}</span> - {description}
      {href && (
        <a href={href} className=" items-center justify-center inline">
          <SquareArrowOutUpRight className="inline-flex w-4 h-4 stroke-3 ml-2 hover:text-accent" />
        </a>
      )}
    </li>
  );
};

export default PropsListItem;
