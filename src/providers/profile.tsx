import { createContext, useContext, ReactNode } from "react";

interface ProfileContextValue {
  edit: boolean;
  handleEdit: () => void;
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
