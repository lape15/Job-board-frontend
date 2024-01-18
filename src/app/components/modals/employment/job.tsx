import React, { useState, ChangeEvent, useEffect, useMemo } from "react";
import { produce } from "immer";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Input, InputProps } from "../../form_fields/input";
import { Dropdown, DropdownProps } from "../../form_fields/dropdown";
import CustomCheckbox, { CheckProps } from "../../form_fields/checkbox";
import { useProfileContext } from "@/providers/profile";
import { JobItem, getTitle } from "@/utils/helper";
import { customStyles } from "@/utils/styles";
import { DateField, DateProps } from "../../form_fields/date";
import { SingleDrop, SingledownProps } from "../../form_fields/single_dropdown";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  handleSave: (val: any) => void;
  jobItem: JobItem;
};

type option = {
  value: string;
  label: string;
};

export interface FieldProp {
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
  row: number;
  idx: number;
  keyName?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isCurrent: boolean;
}

interface FieldComponents {
  text: React.ComponentType<InputProps>;
  email: React.ComponentType<InputProps>;
  dropdown: React.ComponentType<DropdownProps>;
  checkbox: React.ComponentType<CheckProps>;
  list: React.ComponentType<InputProps>;
  date: React.ComponentType<DateProps>;
  single: React.ComponentType<SingledownProps>;
}

const Fields: FieldComponents = {
  text: Input,
  email: Input,
  dropdown: Dropdown,
  checkbox: CustomCheckbox,
  list: Input,
  date: DateField,
  single: SingleDrop,
};

const Field = (props: FieldProp) => {
  const MainField = useMemo(() => Fields[props.type], [props.type]);

  const isDisabled = useMemo(() => {
    const { name, isCurrent } = props;
    return name === "endDate" && isCurrent;
  }, [props]);

  if (Fields[props.type]) return <MainField {...props} disabled={isDisabled} />;
};

export const JobItemModal = (props: ModalProps) => {
  const { modalIsOpen, closeModal, handleSave, jobItem } = props;
  const { currentId } = useProfileContext();
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document?.body);
    }
  }, []);

  const title = useMemo(() => getTitle(jobItem), [jobItem]);
  // console.log(jobItem);

  const isCurrent = useMemo(() => {
    const status = jobItem.find(
      (field) => field.name === "currentlyWorking"
    )?.value;
    console.log({ status });
    return status;
  }, [jobItem]);
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="px-6 text-black">
          <h2 className="text-black text-ubuntu border-b-2 border-gray-200 text-lg pb-2 font-bold py-3">
            {title}
          </h2>
          <div className="flex flex-col gap-2">
            {jobItem.map((job, idx) => (
              <Field idx={idx} key={idx} {...job} isCurrent={isCurrent} />
            ))}
          </div>

          <div className="relative w-full flex justify-end">
            <button
              type="button"
              className="absolue right-0 bg-sky-500 text-white w-24 rounded-lg p-2"
              // onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
