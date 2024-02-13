import { FC, PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

interface FieldWrapperProps extends PropsWithChildren {
  label: string;
  name: string;
}

const FieldWrapper: FC<FieldWrapperProps> = ({ label, name, children }) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-1 flex flex-col gap-1">
        {children}
        {Boolean(errors[name]) && (
          <div className="text-red-500 text-xs">
            {errors[name]?.message?.toString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldWrapper;
