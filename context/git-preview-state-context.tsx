import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type GitPreviewStateType = {
  gitRepo: boolean;
  setGitRepo: Dispatch<SetStateAction<boolean>>;
  merging: boolean;
  setMerging: Dispatch<SetStateAction<boolean>>;
  untracked: boolean;
  setUntracked: Dispatch<SetStateAction<boolean>>;
  modified: boolean;
  setModified: Dispatch<SetStateAction<boolean>>;
  staged: boolean;
  setStaged: Dispatch<SetStateAction<boolean>>;
  ahead: string;
  setAhead: Dispatch<SetStateAction<string>>;
  behind: string;
  setBehind: Dispatch<SetStateAction<string>>;
};

const GitPreviewStateContext = createContext<GitPreviewStateType | undefined>(undefined);

export const useGitPreviewState = (): GitPreviewStateType => {
  const context = useContext(GitPreviewStateContext);
  if (!context) {
    throw new Error("useGitPreviewState must be used within a GitPreviewProvider");
  }
  return context;
};

export const GitPreviewProvider = ({ children }: { children: ReactNode }) => {
  const [gitRepo, setGitRepo] = useState(false);
  const [merging, setMerging] = useState(false);
  const [untracked, setUntracked] = useState(false);
  const [modified, setModified] = useState(false);
  const [staged, setStaged] = useState(false);
  const [ahead, setAhead] = useState("");
  const [behind, setBehind] = useState("");

  return (
    <GitPreviewStateContext.Provider
      value={{
        gitRepo,
        setGitRepo,
        merging,
        setMerging,
        untracked,
        setUntracked,
        modified,
        setModified,
        staged,
        setStaged,
        ahead,
        setAhead,
        behind,
        setBehind,
      }}
    >
      {children}
    </GitPreviewStateContext.Provider>
  );
};
