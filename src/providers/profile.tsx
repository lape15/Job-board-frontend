import { createContext, useContext, ReactNode } from "react";

export type ListItemType = {
  label: string;
  value: string | boolean | Array<string>;
  type: string;
  name: string;
  multi?: boolean;
  options?: Array<{ label: string; value: string }>;
};

interface ProfileContextValue {
  edit: boolean;
  handleEdit: () => void;
  employmentHistory: Array<Array<ListItemType>>;
  addHistory: (arr: Array<Array<ListItemType>>) => void;
  currentId: null | number;
  editHistory: (id: number | null) => void;
}

interface ProfileContextProviderProps {
  children: ReactNode;
  context: ProfileContextValue;
}
// null oder any fur jetzt
const ProfileContext = createContext<null | ProfileContextValue>(null);

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfileContext must be used within a ProfileContextProvider"
    );
  }
  return context;
};

export const ProfileContextProvider: React.FC<ProfileContextProviderProps> = ({
  children,
  context,
}) => {
  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};
