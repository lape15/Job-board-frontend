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
