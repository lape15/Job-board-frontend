"use client";
import { ChangeEvent, useRef, useState } from "react";

export type FileProps = {
  value: string | Array<string>;
  onChange: (e: ChangeEvent<HTMLInputElement>, idx?: number) => void;
  label: string;
  helpText?: string;
  name: string;
  accept: string;
};

export const FileInput = ({
  value,
  onChange,
  label,
  helpText,
  name,
  accept,
}: FileProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<null | File>(null);

  const OpenFileUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col  p-1">
      <label className="text-black text-sm" htmlFor={name}>
        {label}
      </label>
      <div className="flex w-full border border-gray-300 p-1 rounded justify-end">
        <input
          value={value}
          className="text-black h-px w-px"
          onChange={onChange}
          type="file"
          name={name}
          ref={inputRef}
          accept={accept}
        />
        <button
          onClick={OpenFileUpload}
          className="bg-sky-600 text-white w-24 rounded-lg p-1"
        >
          Upload
        </button>
      </div>
      {helpText && <span className="text-grey text-sm">{helpText}</span>}
    </div>
  );
};
