import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import cardsStateData from "../data/cardsStateData";

type AppState = {
  id: number;
  isActif: boolean;
};

type ClassementState = string[];

const initialAppState: AppState[] = [...cardsStateData];

const AppStateContext = createContext<
  | {
      appState: AppState[];
      classementState: ClassementState;
      setAppState: React.Dispatch<React.SetStateAction<AppState[]>>;
      updateAddItemById: (id: number) => void;
      updateAddClassement: (nomCavalier: string) => void;
      updateRemoveClassement: () => void;
    }
  | undefined
>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState(() => initialAppState);
  const [classementState, setClassementState] = useState<ClassementState>([]);

  // useEffect(() => {
  //   console.log("Nouvel état : ", classementState);
  // }, [classementState]);

  // Fonction pour mettre à jour l'état d'un élément par son id

  const updateAddItemById = (id: number) => {
    const updatedState = appState.map((item) => ({
      ...item,
      isActif: item.id === id,
    }));

    setAppState(updatedState);
  };

  // Fonction pour mettre à jour l'état du classement (Ajouter un cavalier a la liste)
  const updateAddClassement = (nomCavalier: string) => {
    // Prend les anciennes valeurs et rajoute la valeur actuelle
    setClassementState((prevClassementState) => [
      ...prevClassementState,
      nomCavalier,
    ]);
  };

  // Fonction pour mettre à jour l'état du classement (Supprimer un cavalier a la liste)
  const updateRemoveClassement = () => {
    setClassementState(
      (prevClassementState) => prevClassementState.slice(0, -1) // Supprime le dernier élément
    );
  };

  return (
    <AppStateContext.Provider
      value={{
        appState,
        classementState,
        setAppState,
        updateAddItemById,
        updateAddClassement,
        updateRemoveClassement
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error(
      "useAppState doit être utilisé dans un composant englobé par AppStateProvider"
    );
  }
  return context;
}
