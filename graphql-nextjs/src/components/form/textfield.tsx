import { FunctionComponent, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import FieldWrapper from "./fieldWrapper";

interface TextFieldCProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const TextFieldC: FunctionComponent<TextFieldCProps> = ({
  label,
  name,
  ...rest
}) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper label={label} name={name}>
      <input
        {...register(name)}
        {...rest}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="you@example.com"
      />
    </FieldWrapper>
  );
};

export default TextFieldC;
