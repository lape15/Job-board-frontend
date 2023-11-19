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

  return (
    <div className="border border-gray-300 w-full p-3">
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
