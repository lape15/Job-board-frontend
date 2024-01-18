"use client";

import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { fields as fieldObj } from "@/variables/fields";
import { Input } from "./components/form_fields/input";
import { addToStorage, fillArr, getCredentials } from "@/utils/helper";
import { call } from "@/api/axios";

type Params = {
  [key: string]: string;
};

export default function Home() {
  const [fields, setFields] = useState([...fieldObj]);
  const [errors, setErrors] = useState(fillArr(fieldObj.length, ""));
  const router = useRouter();

  const updateField = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value;
    const updatedFields = [...fields];

    updatedFields[idx].value = value;
    setFields(updatedFields);
  };

  useEffect(() => {
    const credentials = getCredentials();
    if (credentials?.token) {
      router.push("/profile");
    }
  }, [router]);

  const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currErrors = [...errors];
    const params: Params = {};

    fields.forEach((field, idx) => {
      if (!field.value) {
        currErrors[idx] = `${field.label} cannot be empty`;
      } else {
        params[field.label.toLocaleLowerCase()] = field.value;
      }
    });
    const hasError = currErrors.some((err) => err !== "");
    if (hasError) {
      setErrors([...currErrors]);
      return;
    }
    try {
      const { data } = await call.post("login", params);
      if (data.token) {
        router.push("/profile");
        addToStorage(data.data, data.token);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      currErrors[1] = error!.response!.data.message;
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-white bg-pattern w-full">
      <div className=" mx-auto w-1/3 flex flex-col h-full">
        <div className="bg-form-blue w-full h-40 flex items-center text-center pt-12 justify-center">
          <span className="font-ubuntu relative text-white py-6 after:content-[''] after:w-16 after:h-0.5 after:bg-white after:bottom-3.5 after:left-0 after:absolute text-lg">
            LOGIN
          </span>
        </div>
        <div className="w-full h-1/2 py-2 bg-white shadow-lg">
          <form className="py-3" onSubmit={loginSubmit}>
            {fields.map(({ label, value, helpText, type, name }, idx) => (
              <Input
                key={idx}
                label={label}
                value={value}
                helpText={helpText}
                type={type}
                onChange={(e) => updateField(e, idx)}
                name={name}
              />
            ))}
            <div className="flex justify-center items-center w-full py-2">
              <button
                className="bg-form-blue text-white rounded py-2.5 p-4 mx-auto w-24"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
