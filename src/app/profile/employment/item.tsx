import { FaPenAlt } from "react-icons/fa";
import { useMemo } from "react";
import { useProfileContext } from "@/providers/profile";
import { EmploymentModal } from "@/app/components/modals/employment/employemt_modal";
import { JobItemModal } from "@/app/components/modals/employment/job";

type options = { label: string; value: string };

type ListItemType = {
  jobItem: Array<{
    label: string;
    value: string | boolean | Array<string>;
    type: string;
    name: string;
    multi?: boolean;
    options?: Array<options>;
  }>;
  idx?: number;
};

const visibileFields = [
  "title",
  "companyName",
  "startDate",
  "endDate",
  "location",
  "skills",
];

const returnVal = (type: string, val: string | string[] | boolean) => {
  if (type === "single") {
    const parsed = JSON.parse((val as string) || "");
    const value = Object.keys(parsed).map((key) => parsed[key].label);
    return value.join(",");
  }
  return val;
};

export const Item = (props: ListItemType) => {
  const { jobItem, idx } = props;
  const context = useProfileContext();
  const { edit, editHistory, currentId } = context;

  const isOpen = useMemo(
    () => currentId !== null && idx === currentId,
    [currentId, idx]
  );

  return (
    <div className={` w-full p-3 ${edit ? "border border-gray-300" : ""}`}>
      {edit && (
        <div className="w-full flex justify-end ">
          <button
            className="text-sm text-black"
            type="button"
            onClick={() => editHistory(idx as number)}
          >
            <FaPenAlt />
          </button>
        </div>
      )}
      {jobItem.map((item, id) => {
        if (visibileFields.includes(item.name))
          return (
            <div className="w-full flex flex-col mt-2" key={id}>
              <h4 className="text-black font-bold"> {item.label}</h4>
              <span className="text-gray-400 text-sm">
                {returnVal(item.type, item.value)}
              </span>
            </div>
          );
      })}
      {isOpen && (
        <JobItemModal
          modalIsOpen={isOpen}
          closeModal={() => editHistory(null)}
          handleSave={() => console.log("ah")}
          jobItem={jobItem}
        />
      )}
    </div>
  );
};
