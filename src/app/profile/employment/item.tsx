import { FaPenAlt } from "react-icons/fa";
import { useProfileContext } from "@/providers/profile";

type ListItemType = {
  jobItem: Array<{
    label: string;
    value: string | boolean | Array<string>;
    type: string;
    name: string;
    multi?: boolean;
    options?: Array<{ label: string; value: string }>;
  }>;
};

const visibileFields = [
  "title",
  "companyName",
  "startDate",
  "endDate",
  "location",
  "skills",
];

export const Item = (props: ListItemType) => {
  const { jobItem } = props;
  const context = useProfileContext();
  const { edit } = context;
  return (
    <div className={` w-full p-3 ${edit ? "border border-gray-300" : ""}`}>
      {edit && (
        <div className="w-full flex justify-end ">
          <button className="text-sm" type="button">
            <FaPenAlt />
          </button>
        </div>
      )}
      {jobItem.map((item, id) => {
        if (visibileFields.includes(item.name))
          return (
            <div className="w-full flex flex-col">
              <h4 className="text-black font-bold"> {item.label}</h4>
              <span className="text-gray text-sm">{item.value}</span>
            </div>
          );
      })}
    </div>
  );
};
