"use client";
import { useAuth } from "@/app/hook/route";
import { Formik, Form } from "formik";
import { profileFields, Data } from "@/variables/fields";
import { IsAuth } from "../auth/auth";
import { useCallback, useMemo, useState } from "react";
import { call } from "@/api/axios";
import { PageNav } from "../components/navigation/pagenav";
import { ProfileForm } from "./form";
import { EditView } from "./employment/edit_view";
import { ProfileContextProvider, ListItemType } from "@/providers/profile";

const Registration = () => {
  useAuth();

  const [edit, setEdit] = useState(false);

  const [employmentHistory, setEmploymentHistory] = useState<ListItemType[][]>(
    []
  );

  const addHistory = (history: Array<Array<ListItemType>>) => {
    setEmploymentHistory([...history]);
  };
  const handleEdit = useCallback(() => setEdit((prev) => !prev), []);

  const context = useMemo(
    () => ({
      edit,
      handleEdit,
      employmentHistory,
      addHistory,
    }),
    [edit, handleEdit, employmentHistory]
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
