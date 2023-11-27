"use client";
import { useFormikContext } from "formik";
import { useProfileContext } from "@/providers/profile";
import { FaArrowLeft } from "react-icons/fa";
import { Item } from "./item";

export const EditView = () => {
  const context = useProfileContext();
  const { employmentHistory, handleEdit } = context;
  return (
    <div
      className="h-full bg-white px-12 py-4 w-full flex flex-col gap-4
    "
    >
      <h2 className="text-black flex gap-2 items-center">
        <button
          className="text-black bg-gray-100 p-3 border rounded-full"
          onClick={handleEdit}
        >
          <FaArrowLeft />
        </button>
        <span>Experience </span>
      </h2>
      <div>
        {employmentHistory.map((history, idx) => (
          <Item key={idx} jobItem={history} />
        ))}
      </div>
    </div>
  );
};
