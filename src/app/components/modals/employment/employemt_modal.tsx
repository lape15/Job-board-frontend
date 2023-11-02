import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement(document.body); // Set the app root element

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 1, 1, 0.75)",
  },
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //   },
};

interface FormData {
  title: string;
  employmentType: string;
  companyName: string;
  location: string;
  locationType: string;
  currentlyWorking: boolean;
  startDate: string;
  endDate: string;
  industry: string;
  jobDescription: string;
  roles: string;
  skills: string;
  media: string;
}

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  listOption?: Array<
    Array<{
      label: string;
      value: string | boolean | Array<string>;
      type: string;
      name: string;
      multi?: boolean;
    }>
  >;
  value: string | Array<string>;
};

export const EmploymentModal = (props: ModalProps) => {
  const { modalIsOpen, closeModal, value, listOption } = props;

  const [formData, setFormData] = useState<FormData>({
    title: "",
    employmentType: "",
    companyName: "",
    location: "",
    locationType: "",
    currentlyWorking: false,
    startDate: "",
    endDate: "",
    industry: "",
    jobDescription: "",
    roles: "",
    skills: "",
    media: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    closeModal();
  };
  console.log({ listOption });
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employment Modal"
        style={customStyles}
      >
        <header className="relative w-full flex justify-end">
          <button
            onClick={closeModal}
            className="text-sky-800 items-center font-light hover:rounded-full flex justify-center hover:scale-25 h-8 w-8 hover:border-solid hover:border-2 hover:text-sky-700"
          >
            <FaTimes />
          </button>
        </header>
        <h2 className="text-black text-ubuntu">Add experience</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 p-2">
            {listOption?.map((list, idx) => (
              <div key={idx}>
                {list.map((item, id) => (
                  <div key={id}>
                    <span className="text-black">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};
