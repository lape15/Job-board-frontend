"use client";
import { useFormikContext } from "formik";
import { FaBell, FaArrowLeft } from "react-icons/fa";

type PageNavProps = {
  title: string;
};

export const PageNav = (props: PageNavProps) => {
  const formikContext = useFormikContext();
  const { title } = props;

  return (
    <nav className="flex p-2 border-b-2 border-gray-100 w-100 items-center py-3">
      <div className="w-1/2 flex gap-2 items-center">
        <button className="text-gray-400 bg-arrow-bg p-2  rounded-full w-12 h-8 flex justify-center">
          <FaArrowLeft />
        </button>
        <h2 className="text-black px-1 text-xl">{title || "Dashboard"}</h2>
      </div>
      <div className="w-1/2 flex justify-end px-2 items-center gap-2">
        <span className="text-gray-700 cursor-pointer" title="Notifications">
          <FaBell />
        </span>
        {formikContext && (
          <button
            className="bg-sky-500 text-white w-24 rounded-lg p-2"
            onClick={formikContext.submitForm}
          >
            Confirm
          </button>
        )}
      </div>
    </nav>
  );
};
