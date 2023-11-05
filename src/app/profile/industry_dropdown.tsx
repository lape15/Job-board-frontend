"use client";
import Select from "react-select";
import { useState } from "react";
import { useFormikContext } from "formik";
import { Data } from "@/variables/fields";
import { Dropdown } from "../components/form_fields/dropdown";

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
};

export const IndustryDropdown = (props: DropdownProps) => {
  const { keyName, idx } = props;
  const formik = useFormikContext<Data>();

  const handleSelectChange = (selectedOptions: Array<options>) => {
    const mapped = selectedOptions.map((sel) => sel.value);
    const prev = props.value as Array<string>;
    formik.values[keyName][idx].value = [...mapped, ...prev];
  };

  return (
    <div>
      <Dropdown {...props} onChange={handleSelectChange} />
    </div>
  );
};
