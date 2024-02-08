import { FunctionComponent } from "react";
import Avatar from "../Avatar";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <div className="py-2 items-center bg-red-500 flex w-full justify-between px-20">
      <div className="text-white font-bold text-center">Graphql Draggable</div>
      <div className="flex -space-x-1 overflow-hidden">
        <Avatar name="Duc Dauuu" isActive={true} />
      </div>
    </div>
  );
};

export default Header;
