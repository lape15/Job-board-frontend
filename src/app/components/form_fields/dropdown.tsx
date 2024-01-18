"use client";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Data } from "@/variables/fields";
import { dropdownStyles } from "@/utils/styles";

interface options {
  value: string;
  label: string;
}

export type DropdownProps = {
  label: string;
  value: string | Array<string>;
  options: Array<options>;
  helpText?: string;
  multi?: boolean;
  type: string;
  name: string;
  idx: number;
  keyName: string;
  onChange: (e: Array<options>) => void;
};

function findMatchingItems(array1: Array<options>, array2: Array<string>) {
  return array1.filter((item1) => array2.includes(item1.value));
}

export const Dropdown = (props: DropdownProps) => {
  const { label, options, helpText, multi, name, keyName, idx, onChange } =
    props;
  const formik = useFormikContext<Data>();
  const [value, setValue] = useState(
    findMatchingItems(options, props.value as Array<string>)
  );
  useEffect(
    () => setValue(findMatchingItems(options, props.value as Array<string>)),
    [props.value, options]
  );

  const handleSelectChange = (selectedOptions: Array<options>) => {
    setValue([...selectedOptions]);
    onChange(selectedOptions);
  };

  return (
    <div className="w-full flex flex-col  p-1">
      <label className="text-black text-sm" htmlFor={name}>
        {label}
      </label>
      <div>
        <Select
          isMulti={multi}
          options={options}
          value={value}
          onChange={handleSelectChange}
          className="p-1.5 rounded text-black text-sm"
          styles={dropdownStyles}
          id="select"
          name={name}
        />
      </div>
      <div></div>
      {helpText && <span className="text-grey text-sm">{helpText}</span>}
    </div>
  );
};
