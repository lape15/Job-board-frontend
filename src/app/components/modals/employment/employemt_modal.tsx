import React, { useState, ChangeEvent, useEffect, useMemo } from "react";
import { produce } from "immer";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { customStyles } from "@/utils/styles";
import { EmploymentFieldComponent } from "./employment_fields";
interface StackItem {
  label: string;
  value: string | boolean | string[];
  type: string;
  name: string;
  multi?: boolean;
  options: Array<{ label: string; value: string }>;
  [key: string]:
    | string
    | boolean
    | string[]
    | undefined
    | Array<{ label: string; value: string }>;
}

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  listOption: Array<Array<StackItem>>;
  value: string | Array<string>;
  handleSave: (val: any) => void;
};

export const EmploymentModal = (props: ModalProps) => {
  const { modalIsOpen, closeModal, value, listOption, handleSave } = props;
  const [stack, setStack] = useState<StackItem[][]>([...listOption]);

  const [formData, setFormData] = useState<FormData>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document?.body);
    }
  }, []);

  const isCurrentJob = useMemo(() => {
    return stack[0][4].value;
  }, [stack]);

  const handleChange = (
    row: number,
    col: number,
    e: React.ChangeEvent<HTMLInputElement> | Array<any>
    // arr?: any
  ) => {
    setStack((prev) => {
      return produce(prev, (draft) => {
        if (Array.isArray(e)) {
          draft[row][col].value = e;
        } else if (typeof e === "object" && "target" in e) {
          const {
            target: { name, value, type, checked },
          } = e as React.ChangeEvent<HTMLInputElement>;

          draft[row][col].value = type === "checkbox" ? checked : value;
        } else draft[row][col].value = e;
      });
    });
  };

  const handleSubmit = () => {
    handleSave(stack[0]);
    setStack([...listOption]);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employment Modal"
        style={customStyles}
      >
        <div className="px-6 h-full">
          <header className="relative w-full flex justify-end  ">
            <button
              onClick={closeModal}
              className="text-sky-800 items-center font-light hover:rounded-full flex justify-center hover:scale-25 h-8 w-8 hover:border-solid hover:border-2 hover:text-sky-700"
            >
              <FaTimes />
            </button>
          </header>
          <h2 className="text-black text-ubuntu border-b-2 border-gray-200 text-lg pb-2 font-bold">
            Add experience
          </h2>
          <div
            className=" overscroll-y-scroll"
            style={{
              height: "800px",
              overflowY: "scroll",
            }}
          >
            <form>
              <div className="flex flex-col gap-2 p-2 px-4">
                {stack?.map((list, idx) => (
                  <div key={idx}>
                    {list.map((item, id) => (
                      <div key={id} className="my-4 p-2">
                        <EmploymentFieldComponent
                          {...item}
                          idx={id}
                          row={idx}
                          onChange={handleChange}
                          isCurrentJob={isCurrentJob as boolean}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </form>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="button"
              className="absolue right-0 bg-sky-500 text-white w-24 rounded-lg p-2"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
