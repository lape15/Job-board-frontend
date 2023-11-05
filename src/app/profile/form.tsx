"use client";
import { ChangeEvent, useMemo, useState } from "react";
import { profileFields, Data } from "@/variables/fields";
import { useFormik, FieldArray, Form, useFormikContext, Formik } from "formik";
import * as Yup from "yup";
import hero from "../../../public/default_Image.jpeg";
import { SubField } from "../components/form/sub_fields";
import Image from "next/image";
import { ProfileUpload } from "./profile_upload";

const fieldKeys = Object.keys(profileFields);

export const ProfileForm = () => {
  const { values, submitForm, handleChange } = useFormikContext<Data>();

  return (
    <div className="flex py-8 px-6 gap-5">
      <div className="w-1/2 flex flex-col gap-2">
        <div>
          <h2 className="text-black">User Informatioh</h2>
          <p className="text-black text-sm">
            Enter the inofrmation below to complete registration, you can always
            come back here to edit
          </p>
        </div>
        <div className="p-3">
          {fieldKeys.slice(2, fieldKeys.length).map((field, idx) => (
            <div key={idx}>
              <SubField
                field={values[field]}
                onChange={handleChange}
                keyName={field}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 py-4 flex flex-col gap-2">
        <ProfileUpload />

        <div className="p-3">
          {fieldKeys.slice(0, 2).map((field, idx) => (
            <FieldArray
              key={field}
              name={field}
              render={() => (
                <div key={idx}>
                  <SubField
                    field={values[field]}
                    onChange={handleChange}
                    keyName={field}
                  />
                </div>
              )}
            ></FieldArray>
          ))}
        </div>
      </div>
    </div>
  );
};
