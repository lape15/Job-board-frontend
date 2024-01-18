"use client";

import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { getProperty, newUserFields, user, User } from "@/variables/fields";
import { Input } from "../components/form_fields/input";
import { call } from "@/api/axios";
import { AxiosError, AxiosResponse } from "axios";
import { addToStorage } from "@/utils/helper";

type DataType = {
  message: string;
  token: string;
  data: {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
  };
};

const SignupForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      ...user,
    },

    onSubmit: async (values) => {
      try {
        const { data }: AxiosResponse<DataType> = await call.post(
          "signup",
          values
        );
        if (data.token) {
          addToStorage(data.data, data.token);
          router.push("/profile");
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.log(error);
      }
    },
  });

  return (
    <div className="flex bg-white p-8 w-full bg-pattern">
      <div className=" mx-auto w-1/3 flex flex-col h-full">
        <div className="bg-form-blue w-full h-40 flex items-center text-center pt-12 justify-center">
          <span className="font-ubuntu relative text-white py-6 after:content-[''] after:w-16 after:h-0.5 after:bg-white after:bottom-3.5 after:left-0 after:absolute text-lg">
            Sign up
          </span>
        </div>

        <div className="w-full  py-2 bg-white shadow-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2 py-3 justify-center"
          >
            {newUserFields.map(({ label, helpText, type, name }, idx) => (
              <Input
                key={idx}
                label={label}
                value={getProperty(formik.values, name as keyof User)}
                helpText={helpText}
                type={type}
                onChange={formik.handleChange}
                name={name}
              />
            ))}
            <button
              type="submit"
              className="bg-form-blue text-white rounded py-2.5 p-4 mx-auto w-24"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
