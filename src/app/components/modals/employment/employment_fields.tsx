import { useMemo, ChangeEvent } from "react";
import { Input, InputProps } from "../../form_fields/input";
import { Dropdown, DropdownProps } from "../../form_fields/dropdown";
import { ProfileUpload, FileProps } from "@/app/profile/profile_upload";
// import { EmploymentList, ListProps } from "@/app/profile/employment_list";
import CustomCheckbox, { CheckProps } from "../../form_fields/checkbox";

interface FieldComponents {
  text: React.ComponentType<InputProps>;
  email: React.ComponentType<InputProps>;
  dropdown: React.ComponentType<DropdownProps>;
  checkbox: React.ComponentType<CheckProps>;
  //   list: React.ComponentType<Array<InputProps>>;
  list: React.ComponentType<InputProps>;
}

type Field = {
  label: string;
  value: string | Array<string> | boolean;
  helpText?: string;
  type: keyof FieldComponents;
  multi?: boolean;
  options?: Array<{
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

  onChange: (
    row: number,
    idx: number,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  row: number;
  idx: number;
  keyName?: string;
};

const Fields: FieldComponents = {
  text: Input,
  email: Input,
  dropdown: Dropdown,
  checkbox: CustomCheckbox,
  list: Input,
};

export const EmploymentFieldComponent = (props: Field) => {
  const { onChange, row } = props;

  const MainField = useMemo(() => Fields[props.type], [props.type]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(row, props.idx, e);

  if (Fields[props.type])
    return (
      <div>
        <MainField
          value={props.value}
          label={props.label}
          onChange={handleChange}
          helpText={props.helpText}
          type={props.type}
          name={props.name}
          multi={props.multi}
          options={props.options}
          idx={props.idx}
          //   keyName={props.keyName}
          accept={props.accept}
          listOption={props.listOption}
        />
      </div>
    );
};
