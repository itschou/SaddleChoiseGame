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
type ClassementStateItem = {
  id: number;
  lastName: string;
  firstName: string;
  imageURL: string;
  score: string;
  isActif: boolean;
};

const initialAppState: AppState[] = [...cardsStateData];

const AppStateContext = createContext<
  | {
      appState: AppState[];
      classementState: ClassementState;
      classementStateItem: ClassementStateItem[];
      setAppState: React.Dispatch<React.SetStateAction<AppState[]>>;
      updateAddItemById: (id: number) => void;
      updateAddClassement: (nomCavalier: string) => void;
      updateAddClassementItem: (item: ClassementStateItem) => void;
      updateRemoveClassement: () => void;
      updateRemoveClassementItem: () => void;
    }
  | undefined
>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState(() => initialAppState);
  const [classementState, setClassementState] = useState<ClassementState>([]);
  const [classementStateItem, setClassementStateItem] =
    useState<ClassementStateItem[]>([]);

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

  const updateAddClassementItem = (item: ClassementStateItem) => {
    setClassementStateItem((prevClassementState: ClassementStateItem[]) => [
      ...prevClassementState,
      item,
    ]);
  };

  // Fonction pour mettre à jour l'état du classement (Supprimer un cavalier a la liste)
  const updateRemoveClassementItem = () => {
    setClassementStateItem(
      (prevClassementState: ClassementStateItem[]) =>
        prevClassementState.slice(0, -1) // Supprime le dernier élément
    );
  };

  return (
    <AppStateContext.Provider
      value={{
        appState,
        classementState,
        classementStateItem,
        setAppState,
        updateAddItemById,
        updateAddClassement,
        updateRemoveClassement,
        updateAddClassementItem,
        updateRemoveClassementItem,
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
