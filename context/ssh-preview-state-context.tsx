import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type SshPreviewStateType = {
  sshPreview: boolean;
  setSshPreview: Dispatch<SetStateAction<boolean>>;
};

const SshPreviewStateContext = createContext<SshPreviewStateType | undefined>(undefined);

export const useSshPreviewState = (): SshPreviewStateType => {
  const context = useContext(SshPreviewStateContext);
  if (!context) {
    throw new Error("useSshPreviewState must be used within a SshPreviewProvider");
  }
  return context;
};

export const SshPreviewProvider = ({ children }: { children: ReactNode }) => {
  const [sshPreview, setSshPreview] = useState(false);

  return (
    <SshPreviewStateContext.Provider
      value={{
        sshPreview,
        setSshPreview,
      }}
    >
      {children}
    </SshPreviewStateContext.Provider>
  );
};
