import { Data } from "@/variables/fields";

export const fillArr = <T>(length: number, value: T): T[] => {
  const filled = new Array(length).fill(value);
  return filled;
};

type User = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
};

interface options {
  value: string | number;
  label: string | number;
}

export type JobItem = Array<{
  label: string;
  value: string | boolean | Array<string>;
  type: string;
  name: string;
  multi?: boolean;
  options?: Array<{ label: string; value: string }>;
}>;

export const addToStorage = (user: User, token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user || "{}"));
    localStorage.setItem("token", token);
  }
};

export const removeFromStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};

export const getCredentials = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const credentials = {
      user: JSON.parse(user || "{}") || {},
      token,
    };
    return credentials;
  }
};

export const getTitle = (items: JobItem) => {
  const result = items.find((item) => {
    if (item["name"] === "companyName") {
      return item;
    }
  });
  return result?.value;
};

export const getFieldValue = (key: string, index: number, values: Data) => {
  return values[key][index];
};

export const getAllMonths = () => {
  const months: Array<options> = [];
  const date = new Date();

  for (let i = 0; i < 12; i += 1) {
    date.setMonth(i);
    const month = date.toLocaleString("default", { month: "long" });
    const short = date.toLocaleString("default", { month: "short" });
    months.push({
      value: short,
      label: month,
    });
  }

  return months;
};

export const getYears = () => {
  const years: Array<options> = [];
  for (let i = 2024; i >= 1930; i -= 1) {
    years.push({
      value: i,
      label: i,
    });
  }
  return years;
};
