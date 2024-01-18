"use client";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { Data } from "@/variables/fields";
import { useFormikContext } from "formik";
import { cloneDeep } from "lodash-es";
import { FaPenAlt, FaPlus } from "react-icons/fa";
import { EmploymentModal } from "../../components/modals/employment/employemt_modal";
import { Item } from "./item";
import { useProfileContext } from "@/providers/profile";

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
  value: ListItemType[][];
  listOption?: Array<Array<ListItemType>>;
}

export const EmploymentList = (props: ListProps) => {
  const { label, value, keyName, idx, name, listOption } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [list, setList] = useState<ListItemType[][]>([]);
  const { values, setValues } = useFormikContext<Data>();
  const context = useProfileContext();
  const { handleEdit, addHistory } = context;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = (val: any) => {
    flushSync(() => {
      setList((prev) => {
        const newVal = [...prev, val];
        const newVals = cloneDeep(values);
        newVals[keyName][idx].value = newVal;
        setValues(newVals);
        return newVal;
      });
    });
  };

  return (
    <div className="text-black p-4 bg-white-100  h-full my-12 overscroll-contain shadow-lg">
      <h3 className="w-full flex justify-end gap-3">
        <button
          onClick={openModal}
          className="text-gray-400 flex gap-1.5 items-center hover:text-sky-300"
          type="button"
        >
          <span className="text-sm">
            <FaPlus />
          </span>
        </button>
        {value.length > 0 && (
          <button
            className="text-gray-400 flex gap-1.5 items-center hover:text-sky-300"
            onClick={() => {
              addHistory(value);
              handleEdit();
            }}
            type="button"
          >
            <span className="text-sm">
              <FaPenAlt />
            </span>
          </button>
        )}
      </h3>
      {value.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <h2 className="text-black text-center font-bold">
            PLEASE ENTER YOUR PROFESSIONAL EXPERIENCE
          </h2>
        </div>
      ) : (
        <div className="w-full flex-col flex text-black gap-2">
          {value.map((items, idx) => (
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
