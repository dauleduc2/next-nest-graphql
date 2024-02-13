import { useFormContext } from "react-hook-form";
import FieldWrapper from "./fieldWrapper";

export type AvailableInputTypes = string | number | undefined;

export interface SelectOption<T extends AvailableInputTypes> {
  label: string;
  value: T;
}

interface SelectCProps<T extends AvailableInputTypes>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption<T>[];
  name: string;
}

const SelectC = <T extends AvailableInputTypes>({
  label,
  name,
  options,
  ...rest
}: SelectCProps<T>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper label={label} name={name}>
      <select
        {...register(name)}
        {...rest}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {options.map((option, index) => (
          <option key={option.label ?? index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};

export default SelectC;
