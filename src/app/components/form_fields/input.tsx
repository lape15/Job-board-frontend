"use client";
import { ChangeEvent } from "react";

export type InputProps = {
  value: string | Array<string>;
  onChange: (e: ChangeEvent<HTMLInputElement>, idx?: number) => void;
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
  <div className="w-100 flex flex-col  p-1">
    <label className="text-black text-sm" htmlFor={name}>
      {label}
    </label>
    <input
      value={value}
      className="border border-gray-300 p-1.5 rounded text-black"
      onChange={onChange}
      type={type}
      name={name}
    />
    {helpText && <span className="text-grey text-sm">{helpText}</span>}
  </div>
);
