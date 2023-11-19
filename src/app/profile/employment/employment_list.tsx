"use client";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { Data } from "@/variables/fields";
import { useFormikContext } from "formik";
import { FaPenAlt } from "react-icons/fa";
import { EmploymentModal } from "../../components/modals/employment/employemt_modal";
import { Item } from "./item";

type ListItemType = {
  label: string;
  value: string | boolean | Array<string>;
  type: string;
  name: string;
  multi?: boolean;
  options?: Array<{ label: string; value: string }>;
};
export interface ListProps {
  label: string;
  helpText?: string;
  type: string;
  name: string;
  idx: number;
  keyName: string;
  value: string | Array<string>;
  listOption?: Array<Array<ListItemType>>;
}

export const EmploymentList = (props: ListProps) => {
  const { label, value, keyName, idx, name, listOption } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [list, setList] = useState<ListItemType[][]>([]);
  const formik = useFormikContext<Data>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = (val: any) => {
    formik.values[keyName][idx].value = val;
    setList(val);
  };
  console.log({ list, value });
  return (
    <div className="text-black p-4 bg-white-100  h-full my-12 overscroll-contain shadow-lg">
      <h3 className="w-full flex justify-end gap-1">
        <button
          className="text-black flex gap-1.5 items-center hover:text-sky-300"
          onClick={openModal}
          type="button"
        >
          <span className="text-sm font-bold">Add position</span>
          <span className="text-sm">
            <FaPenAlt />
          </span>
        </button>
      </h3>
      {list.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <h2 className="text-black text-center font-bold">
            PLEASE ENTER YOUR PROFESSIONAL EXPERIENCE
          </h2>
        </div>
      ) : (
        <div className="w-full flex text-black">
          {list.map((items, idx) => (
            <Item key={idx} jobItem={items} />
          ))}
        </div>
      )}
      {modalIsOpen && (
        <EmploymentModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          listOption={listOption}
          value={value}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};
