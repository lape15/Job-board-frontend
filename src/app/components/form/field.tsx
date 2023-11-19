import { useMemo, ChangeEvent } from "react";
import { Input, InputProps } from "../form_fields/input";
import { ProfileUpload, FileProps } from "@/app/profile/profile_upload";
import {
  EmploymentList,
  ListProps,
} from "@/app/profile/employment/employment_list";
import {
  IndustryDropdown,
  DropdownProps,
} from "@/app/profile/industry_dropdown";

interface FieldComponents {
  text: React.ComponentType<InputProps>;
  email: React.ComponentType<InputProps>;
  dropdown: React.ComponentType<DropdownProps>;
  list: React.ComponentType<ListProps>;
}

type Field = {
  field: {
    label: string;
    value: string | Array<string>;
    helpText?: string;
    type: keyof FieldComponents;
    multi?: boolean;
    options: Array<{
      value: string;
      label: string;
    }>;
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
    accept?: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  idx: number;
  keyName: string;
};

const Fields: FieldComponents = {
  text: Input,
  email: Input,
  dropdown: IndustryDropdown,
  list: EmploymentList,
};

export const FieldComponent = (props: Field) => {
  const { field, onChange } = props;

  const MainField = useMemo(() => Fields[field.type], [field.type]);
  if (Fields[field.type])
    return (
      <div>
        <MainField
          value={field.value}
          label={field.label}
          onChange={onChange}
          helpText={field.helpText}
          type={field.type}
          name={field.name}
          multi={field.multi}
          options={field.options}
          idx={props.idx}
          keyName={props.keyName}
          // accept={field.accept}
          listOption={field.listOption}
        />
      </div>
    );
};
