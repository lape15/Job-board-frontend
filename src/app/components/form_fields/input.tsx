"use client";
import { ChangeEvent } from "react";

export type InputProps = {
  value: string | Array<string> | boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  helpText?: string;
  type: string;
  name: string;
};

export const Input = ({
  value,
  onChange,
  label,
  helpText,
  type,
  name,
}: InputProps) => (
  <div className="w-full flex flex-col  p-1">
    <label className="text-black text-sm" htmlFor={name}>
      {label}
    </label>
    <input
      value={value as string | number}
      className="border border-gray-300 p-1.5 rounded text-black bg-white font-inter text-sm"
      onChange={onChange}
      type={type}
      name={name}
    />
    {helpText && <span className="text-grey text-sm">{helpText}</span>}
  </div>
);
