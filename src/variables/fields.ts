import { FieldComponents } from "@/app/components/form/sub_fields";

const jobIndustries = [
  { label: "Information Technology", value: "IT" },
  { label: "Finance and Banking", value: "FB" },
  { label: "Healthcare and Medical", value: "HM" },
  { label: "Education", value: "ED" },
  { label: "Manufacturing", value: "MN" },
  { label: "Retail", value: "RT" },
  { label: "Hospitality and Tourism", value: "HT" },
  { label: "Media and Entertainment", value: "ME" },
  { label: "Marketing and Advertising", value: "MA" },
  { label: "Construction", value: "CN" },
  { label: "Transportation and Logistics", value: "TL" },
  { label: "Government and Public Administration", value: "GA" },
  { label: "Non-profit and Charity", value: "NC" },
  { label: "Legal", value: "LG" },
  { label: "Art and Design", value: "AD" },
  { label: "Engineering", value: "EN" },
  { label: "Energy and Utilities", value: "EU" },
  { label: "Agriculture", value: "AG" },
  { label: "Food and Beverage", value: "FBV" },
  { label: "Environmental", value: "ENV" },
  { label: "Sports and Fitness", value: "SF" },
  { label: "Consulting", value: "CS" },
  { label: "Real Estate", value: "RE" },
  { label: "Pharmaceuticals", value: "PH" },
  { label: "Telecommunications", value: "TC" },
  { label: "Aerospace and Defense", value: "AED" },
  { label: "Automotive", value: "AUTO" },
  { label: "Fashion and Apparel", value: "FA" },
  { label: "Gaming", value: "GM" },
  { label: "Social Services", value: "SS" },
  { label: "Other", value: "OTH" },
];

const locationOptions = [
  { label: "On-site", value: "onsite" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Remote", value: "remote" },
];
export const fields = [
  {
    label: "Email",
    value: "",
    helpText: "Enter your email",
    type: "text",
    name: "email",
  },
  {
    label: "Password",
    value: "",
    helpText: "Enter your password",
    type: "password",
    name: "password",
  },
];

export const newUserFields = [
  {
    label: "First Name",
    value: "",
    name: "firstName",
    helpText: "enter your first name",
    type: "text",
  },
  {
    label: "Last Name",
    value: "",
    name: "lastName",
    helpText: "Enter your lastName",
    type: "text",
  },
  {
    label: "Email",
    value: "",
    helpText: "Enter your email",
    type: "text",
    name: "email",
  },
  {
    label: "Password",
    value: "",
    helpText: "Enter your password",
    type: "password",
    name: "password",
  },
];

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const user: User = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "secret",
};

export function getProperty(obj: User, key: keyof User) {
  return obj[key];
}

export interface Data {
  [key: string]: {
    label: string;
    value: string | Array<string>;
    helpText?: string;
    type: keyof FieldComponents;
    multi?: boolean;
    options?: Array<{ label: string; value: string }>;
    list?: boolean;
    name: string;
    listOption?: Array<
      Array<{
        label: string;
        value: string | boolean | Array<string>;
        type: string;
        name: string;
        multi?: boolean;
        options?: Array<{ label: string; value: string }>;
      }>
    >;
  }[];
}

export const profileFields: Data = {
  photo: [
    {
      label: "Profile photo",
      value: "",
      name: "photo",
      type: "file",
      accept: "image/*",
    },
  ],
  personalInfo: [
    {
      label: "Email Address",
      value: "",
      name: "email",
      helpText: "Please enter an email in the format username@domain.com",
      type: "email",
    },
    {
      label: "First Name",
      value: "",
      name: "firstName",
      helpText: "enter your first name",
      type: "text",
    },
    {
      label: "Last Name",
      value: "",
      name: "lastName",
      helpText: "Enter your lastName",
      type: "text",
    },
    {
      label: "Address",
      value: "",
      helpText: "please enter a valid address",
      type: "text",
      name: "address",
    },
  ],

  jobPreferenceInfo: [
    {
      label: "Preferred Title",
      value: "",
      name: "prefferedTitle",
      helpText: "Please enter your title",
      type: "text",
    },

    {
      label: "Industry",
      value: [],
      options: [...jobIndustries],
      helpText: "Please select desired work industry",
      type: "dropdown",
      multi: true,
      name: "industry",
    },
    {
      label: "Location",
      value: [""],
      name: "location",
      list: true,
      type: "text",
    },
    {
      label: "Employment type",
      value: [""],
      name: "employmentType",
      list: true,
      type: "text",
    },
    {
      label: "Salary Expectation",
      value: "",
      name: "salary",
      type: "text",
    },
  ],
  professionalInfo: [
    {
      label: "Employment  History",
      value: [],
      type: "list",
      list: true,
      name: "employmentHistry",
      listOption: [
        [
          {
            label: "Title",
            value: "",
            type: "text",
            name: "title",
          },
          {
            label: "Company Name",
            value: "",
            type: "text",
            name: "companyName",
          },
          {
            label: "Location",
            value: "",
            type: "text",
            name: "location",
          },
          {
            label: "Location type",
            value: "",
            type: "dropdown",
            name: "locationType",
            multi: true,
            options: [...locationOptions],
          },

          {
            label: "I am currently working in this role",
            value: false,
            type: "checkbox",
            name: "currentlyWorking",
          },
          {
            label: "Start Date",
            value: "",
            type: "text",
            name: "startDate",
          },
          {
            label: "End Date",
            value: "",
            type: "text",
            name: "endDate",
          },
          {
            label: "Industry",
            value: "",
            type: "text",
            name: "industry",
          },

          {
            label: "Job Description",
            value: [""],
            type: "text",
            name: "jobDescription",
          },
          {
            label: "Skills",
            value: "",
            type: "text",
            name: "skills",
          },
          {
            label: "Media e.g CVs and certificates",
            value: "",
            type: "file",
            name: "media",
            multi: true,
          },
        ],
      ],
    },
  ],
  workInfo: [
    {
      label: "Citizenship",
      value: [""],
      name: "citizenship",
      list: true,
      type: "text",
    },
    {
      label: "Visa type",
      value: "",
      name: "visaType",
      type: "text",
    },
  ],
  // photo: [
  //   {
  //     label: "Profile photo",
  //     value: "",
  //     name: "photo",
  //     type: "file",
  //   },
  // ],
};
