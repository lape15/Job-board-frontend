"use client";
import Select, { ActionMeta, SingleValue } from "react-select";
import { FocusEvent, useCallback, useEffect, useState } from "react";
import { dropdownStyles } from "@/utils/styles";
import { getAllMonths, getYears, currentValue } from "@/utils/helper";

interface options {
  value: string | number;
  label: string | number;
}

const parsePrev = (prev: string): ValueType => JSON.parse(prev || "");

export type SingledownProps = {
  label: string;
  value: string;
  options: Array<options>;
  helpText?: string;
  type: string;
  name: string;
  idx: number;
  keyName: string;
  onChange: (e: string) => void;
  disabled: boolean;
};
type ValueType = { [key: string]: options };

export const SingleDrop = (props: SingledownProps) => {
  const {
    label,
    options,
    helpText,
    name,
    keyName,
    idx,
    onChange,
    disabled,
    value: preValue,
  } = props;
  const [value, setValue] = useState<ValueType>(
    !preValue ? {} : parsePrev(preValue)
  );

  useEffect(() => {
    if (disabled) {
      setValue((val) => ({
        ...val,
        ...currentValue,
      }));
      onChange && onChange(JSON.stringify(currentValue));
    }
  }, [disabled, onChange]);

  const handleDateChange = useCallback(
    (e: SingleValue<options>, a: ActionMeta<options>) => {
      setValue((val) => {
        const newVal = {
          ...val,
          [a.name as string]: e!,
        };
        onChange(JSON.stringify(newVal));

        return newVal;
      });
    },
    [onChange]
  );

  return (
    <div className="w-full flex flex-col  p-1">
      <label className="text-black text-sm" htmlFor={name}>
        {label}
      </label>
      <div className="w-full flex gap-4">
        <div className="flex-1">
          <Select
            isMulti={false}
            options={getAllMonths()}
            value={value["month"] as options | null}
            onChange={handleDateChange}
            className="p-1 rounded text-black"
            styles={dropdownStyles}
            id="select"
            name="month"
            isDisabled={disabled}
          />
        </div>
        <div className="flex-1">
          <Select
            isMulti={false}
            options={getYears()}
            value={value["year"] as options | null}
            onChange={handleDateChange}
            className="p-1 rounded text-black"
            styles={dropdownStyles}
            id="select"
            name="year"
            isDisabled={disabled}
          />
        </div>
      </div>
      <div></div>
      {helpText && <span className="text-grey text-sm">{helpText}</span>}
    </div>
  );
};
