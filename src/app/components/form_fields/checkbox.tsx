"use client";

import React, { useState, ChangeEvent } from "react";

export type CheckProps = {
  // value: string | Array<string>;
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, idx?: number) => void;
  label: string;
  helpText?: string;
  type: string;
  name: string;
};

const CustomCheckbox = ({
  value,
  onChange,
  label,
  helpText,
  type,
  name,
}: CheckProps) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="hidden"
        id="custom-checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div
        className={`w-6 h-6 border border-gray-300 rounded-md cursor-pointer ${
          isChecked ? "bg-indigo-500" : "bg-white"
        }`}
        onClick={handleCheckboxChange}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-4 h-4 mx-auto my-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <label htmlFor="custom-checkbox" className="ml-2 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
