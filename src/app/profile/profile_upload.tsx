"use client";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { FileInput } from "../components/form_fields/file";
import Image from "next/image";
import { uploadProfilePhoto } from "@/api/profile";
import { AxiosError } from "axios";
import { useFormikContext } from "formik";
import { Data } from "@/variables/fields";
import hero from "../../../public/default_Image.jpeg";
import { FaPenAlt } from "react-icons/fa";

export type FileProps = {
  value: string | Array<string>;
  onChange: (e: ChangeEvent<HTMLInputElement>, idx?: number) => void;
  label: string;
  helpText?: string;
  type: string;
  name: string;
  idx: number;
  keyName: string;
};

export const ProfileUpload = () => {
  const [file, setFile] = useState<null | string>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formik = useFormikContext<Data>();
  const [profilePhoto, setProfilePhoto] = useState("");

  const OpenFileUpload = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const result: { url: string } = await uploadProfilePhoto(
        e!.target!.files![0]
      );
      setFile(result.url);
      formik.values["photo"][0].value = result.url;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <h3 className="text-black">Profile photo</h3>
      <div className="flex w-full justify-center items-center">
        <div className="h-32 w-32 bg-rose-200 rounded-full flex justify-center items-center relative ">
          <Image width={70} height={70} alt="Profile pic" src={file || hero} />
          <button
            className="absolute w-10 h-10 rounded-full bg-sky-500 flex justify-center items-center bottom-1 right-1"
            onClick={OpenFileUpload}
            type="button"
          >
            <span className="text-white">
              <FaPenAlt />
            </span>
          </button>
          <input
            name="image"
            className="text-black h-px w-px"
            accept=".png,.svg,.jpg,.jpeg"
            onChange={handleFileChange}
            type="file"
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
};
