"use client";
import { useAuth } from "@/app/hook/route";
import { Formik, Form } from "formik";
import { profileFields, Data } from "@/variables/fields";
import { IsAuth } from "../auth/auth";
import { useCallback, useMemo, useState } from "react";
import { call } from "@/api/axios";
import { PageNav } from "../components/navigation/pagenav";
import { ProfileForm } from "./form";
import { ProfileContextProvider } from "@/providers/profile";

const EditView = () => (
  <div
    className="h-full bg-white px-6 py-4 w-full flex flex-col gap-4
  "
  >
    <h2 className="text-black">Experience</h2>
    <div>
      <p className="text-black">Here we go!!!</p>
    </div>
  </div>
);

const Registration = () => {
  useAuth();

  const [edit, setEdit] = useState(false);

  const handleEdit = useCallback(() => setEdit((prev) => !prev), []);

  const context = useMemo(
    () => ({
      edit,
      handleEdit,
    }),
    [edit, handleEdit]
  );

  return (
    <ProfileContextProvider context={context}>
      <div className="bg-white flex flex-col w-full overflow-y-scroll">
        <Formik
          initialValues={{ ...profileFields }}
          onSubmit={async (values, actions) => {
            console.log(values);
          }}
          enableReinitialize
        >
          <Form>
            {edit ? (
              <EditView />
            ) : (
              <>
                <PageNav title="Profile" />
                <ProfileForm />
              </>
            )}
          </Form>
        </Formik>
      </div>
    </ProfileContextProvider>
  );
};

export default Registration;
