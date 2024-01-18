import { useMemo, ChangeEvent } from "react";
import { Input, InputProps } from "../../form_fields/input";
import { Dropdown, DropdownProps } from "../../form_fields/dropdown";
import { ProfileUpload, FileProps } from "@/app/profile/profile_upload";
// import { EmploymentList, ListProps } from "@/app/profile/employment_list";
import CustomCheckbox, { CheckProps } from "../../form_fields/checkbox";
import { type } from "os";
import { DateField, DateProps } from "../../form_fields/date";
import { SingleDrop, SingledownProps } from "../../form_fields/single_dropdown";

interface FieldComponents {
  text: React.ComponentType<InputProps>;
  email: React.ComponentType<InputProps>;
  dropdown: React.ComponentType<DropdownProps>;
  checkbox: React.ComponentType<CheckProps>;
  //   list: React.ComponentType<Array<InputProps>>;
  list: React.ComponentType<InputProps>;
  date: React.ComponentType<DateProps>;
  single: React.ComponentType<SingledownProps>;
}
type option = {
  value: string;
  label: string;
};
type Field = {
  label: string;
  value: string | Array<string> | boolean;
  helpText?: string;
  type: keyof FieldComponents;
  multi?: boolean;
  options?: Array<option>;
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
    e?: ChangeEvent<HTMLInputElement> | Array<string>
  ) => void;
  row: number;
  idx: number;
  keyName?: string;
  isCurrentJob: boolean;
};

const Fields: FieldComponents = {
  text: Input,
  email: Input,
  dropdown: Dropdown,
  checkbox: CustomCheckbox,
  list: Input,
  date: DateField,
  single: SingleDrop,
};

export const EmploymentFieldComponent = (props: Field) => {
  const { onChange, row } = props;

  const MainField = useMemo(() => Fields[props.type], [props.type]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(row, props.idx, e);

  const handleSelectChange = (selectedOptions: Array<option>) => {
    const mapped = selectedOptions.map((sel) => sel.value);
    const prev = props.value as Array<string>;
    onChange(row, props.idx, [...mapped, ...prev]);
  };

  const isDisabled = useMemo(() => {
    const { name, isCurrentJob } = props;
    return name === "endDate" && isCurrentJob;
  }, [props]);

  if (Fields[props.type])
    return (
      <div>
        <MainField
          value={props.value}
          label={props.label}
          onChange={
            props.type === "dropdown" ? handleSelectChange : handleChange
          }
          helpText={props.helpText}
          type={props.type}
          name={props.name}
          multi={props.multi}
          options={props.options}
          idx={props.idx}
          //   keyName={props.keyName}
          accept={props.accept}
          listOption={props.listOption}
          disabled={isDisabled}
        />
      </div>
    );
};
