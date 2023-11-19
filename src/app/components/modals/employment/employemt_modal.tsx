import React, { useState, ChangeEvent, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { EmploymentFieldComponent } from "./employment_fields";

// Modal.setAppElement(document?.body); // Set the app root element

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 1, 1, 0.75)",
  },
  content: {
    padding: "1rem",
  },
};

// interface StackItem {
//   label: string;
//   value: string | boolean | Array<string>;
//   type: string;
//   name: string;
//   multi?: boolean;
//   options: Array<{ label: string; value: string }>;
// }

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

  const handleChange = (
    row: number,
    col: number,
    e: React.ChangeEvent<HTMLInputElement> | Array<any>
    // arr?: any
  ) => {
    setStack((prev) => {
      const old = [...prev];
      if (Array.isArray(e)) {
        ``;
        old[row][col].value = e;
      } else if (typeof e === "object" && "target" in e) {
        const {
          target: { name, value, type, checked },
        } = e as React.ChangeEvent<HTMLInputElement>;

        old[row][col].value = type === "checkbox" ? checked : value;
      }
      return old;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(stack);
    closeModal();
  };
  //   console.log({ stack });
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employment Modal"
        style={customStyles}
      >
        <div className="px-6">
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
          <form
          //   onSubmit={handleSubmit}
          >
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
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </form>
          <div className="relative w-full flex justify-end">
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
