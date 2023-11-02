"use client";
import Select from "react-select";
import { useState } from "react";
import { useFormikContext } from "formik";
import { Data } from "@/variables/fields";

interface options {
  value: string;
  label: string;
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #ccc",
    borderRadius: "4px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f4f4f4",
  }),
  option: (provided) => ({
    ...provided,
    color: "#333",
  }),
};
export type DropdownProps = {
  label: string;
  value: string | Array<string>;
  options: Array<options>;
  helpText?: string;
  multi?: boolean;
  type: string;
  name: string;
  onChange: () => any;
  idx: number;
  keyName: string;
};

export const Dropdown = (props: DropdownProps) => {
  const { label, options, helpText, multi, onChange, name, keyName, idx } =
    props;
  const formik = useFormikContext<Data>();
  const [value, setValue] = useState(props.value);

  const handleSelectChange = (selectedOptions: any) => {
    formik.values[keyName][idx].value = selectedOptions;
    setValue([...selectedOptions]);
  };

  return (
    <div className="w-100 flex flex-col  p-1">
      <label className="text-black text-sm" htmlFor={name}>
        {label}
      </label>
      <div>
        <Select
          isMulti={multi}
          options={options}
          value={value}
          onChange={handleSelectChange}
          className="p-1.5 rounded text-black"
          styles={customStyles}
          id="select"
          name={name}
        />
      </div>
      <div></div>
      {helpText && <span className="text-grey text-sm">{helpText}</span>}
    </div>
  );
};
