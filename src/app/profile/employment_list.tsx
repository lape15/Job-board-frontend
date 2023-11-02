"use client";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { FaPenAlt } from "react-icons/fa";
import { EmploymentModal } from "../components/modals/employment/employemt_modal";

export interface ListProps {
  label: string;
  helpText?: string;
  type: string;
  name: string;
  idx: number;
  keyName: string;
  value: string | Array<string>;
  listOption?: Array<
    Array<{
      label: string;
      value: string | boolean | Array<string>;
      type: string;
      name: string;
      multi?: boolean;
    }>
  >;
}

export const EmploymentList = (props: ListProps) => {
  const { label, value, keyName, idx, name, listOption } = props;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(listOption, "listOptione");
  return (
    <div className="text-black p-2 bg-white-100 max-h-64 h-32 my-12 overscroll-contain shadow-lg">
      <h3 className="w-full flex justify-end gap-1">
        <button
          className="text-black flex gap-1.5 items-center hover:text-sky-300"
          onClick={openModal}
        >
          <span className="text-sm">Add position</span>
          <span className="text-sm">
            <FaPenAlt />
          </span>
        </button>
      </h3>
      {value.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <h2 className="text-black text-center font-extrabold">
            PLEASE ENTER YOUR PROFESSIONAL EXPERIENCE
          </h2>
        </div>
      ) : (
        <div className="w-full flex text-black">LIST HERE</div>
      )}
      <EmploymentModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        listOption={listOption}
        value={value}
      />
    </div>
  );
};
