import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type DateProps = {
  type: string;
  value: Date;
  label: string;
  name: string;
  disabled: boolean;
};

export const DateField = (props: DateProps) => {
  const { label, name, value, disabled } = props;
  const [startDate, setStartDate] = useState<Date>(value || new Date());

  return (
    <div className="w-full flex flex-col p-1">
      <label className="text-black text-sm" htmlFor={name}>
        {label}
      </label>
      <div
        className={`w-full ${disabled ? "bg-grey-200 opacity-60" : ""}
            `}
      >
        <DatePicker
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date!)}
          className={`border border-gray-700 p-1.5 rounded text-black bg-white focus:border-red-300 w-full text-ubuntu 
          `}
          disabled
        />
      </div>
    </div>
  );
};
