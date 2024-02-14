import { FunctionComponent } from "react";
import { useFormContext } from "react-hook-form";
import FieldWrapper from "./fieldWrapper";

interface TextareaCProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextareaC: FunctionComponent<TextareaCProps> = ({
  label,
  name,
  ...rest
}) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper label={label} name={name}>
      <textarea
        {...register(name)}
        {...rest}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </FieldWrapper>
  );
};

export default TextareaC;
