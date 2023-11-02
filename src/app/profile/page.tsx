"use client";
import { useAuth } from "@/app/hook/route";
import { Formik, Form } from "formik";
import { profileFields, Data } from "@/variables/fields";
import { IsAuth } from "../auth/auth";
import { useEffect } from "react";
import { call } from "@/api/axios";
import { PageNav } from "../components/navigation/pagenav";
import { ProfileForm } from "./form";

const Registration = () => {
  useAuth();
  return (
    <div className="bg-white flex flex-col w-full overflow-y-scroll">
      <Formik
        initialValues={{ ...profileFields }}
        onSubmit={async (values, actions) => {
          console.log(values);
        }}
        enableReinitialize
      >
        <Form>
          <PageNav title="Profile" />
          <ProfileForm />
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
