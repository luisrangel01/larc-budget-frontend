import { ChangeEventHandler } from "react";

type SelectProps = {
  defaultValue: string;
  options: any[];
  onChange: ChangeEventHandler;
  valueField: string;
  textField: string;
};

const Select = ({
  defaultValue,
  options,
  onChange,
  valueField,
  textField,
}: SelectProps) => {
  return (
    <select value={defaultValue} onChange={onChange}>
      {options.map((option: any) => {
        return (
          <option key={option[valueField]} value={option[valueField]}>
            {option[textField]}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
