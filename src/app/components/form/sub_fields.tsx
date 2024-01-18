"use client";
import { ChangeEvent } from "react";
import { Field } from "formik";
import { FieldComponent } from "./field";
import { InputProps } from "../form_fields/input";
import { DropdownProps } from "../form_fields/dropdown";
import { ListProps } from "@/app/profile/employment/employment_list";
import { SingledownProps } from "../form_fields/single_dropdown";

export interface FieldComponents {
  text: React.ComponentType<InputProps>;
  email: React.ComponentType<InputProps>;
  dropdown: React.ComponentType<DropdownProps>;
  // file: React.ComponentType<FileProps>;
  list: React.ComponentType<ListProps>;
  single: React.Component<SingledownProps>;
}

type SubFieldProp = {
  field: Array<{
    label: string;
    value: string | Array<string>;
    helpText?: string;
    type: keyof FieldComponents;
    multi?: boolean;
    options?: Array<{ value: string; label: string }>;
    list?: boolean;
    name: string;
    listOption?: Array<
      Array<{
        label: string;
        value: string | boolean | Array<string>;
        type: string;
        name: string;
        multi?: boolean;
      }>
    >;
    aceept?: string;
  }>;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  keyName: string;
};

export const SubField = (props: SubFieldProp) => {
  const { field, onChange, keyName } = props;

  return (
    <div className="w-full h-100 flex flex-col gap-0.5">
      {field.map((fld, idx) => (
        <Field
          key={idx}
          name={`${keyName}[${idx}].value`}
          idx={idx}
          keyName={keyName}
          component={FieldComponent}
          field={{
            ...fld,
            name: `${keyName}[${idx}].value`,
          }}
          onChange={onChange}
        />
      ))}
    </div>
  );
};
