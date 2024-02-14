import { FunctionComponent } from "react";
import { useCreateAvatar } from "@/hooks/avatar";
import clsx from "clsx";

interface AvatarProps {
  name?: string;
  isActive?: boolean;
}

const Avatar: FunctionComponent<AvatarProps> = ({ name, isActive }) => {
  const { createAvatar } = useCreateAvatar();
  const svg = createAvatar(name).toString();

  return (
    <div
      className={clsx(
        "inline-flex h-10 w-10 items-center justify-center rounded-full overflow-hidden ",
        isActive && "border-2 border-green-500 "
      )}
    >
      <div
        className="w-full h-full rounded-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};

export default Avatar;
