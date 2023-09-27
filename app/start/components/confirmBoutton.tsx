import { useAppState } from "@/app/api/AppStateContext";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ConfirmBoutton = () => {
  const { appState, classementState, classementStateItem } = useAppState();
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const storeData = () => {
    setIsLoading(true);
    const jsonData = JSON.stringify(classementStateItem);

    const binId = "6512b9f512a5d376598366df";
    // Définis l'URL de l'API JSONBin
    const jsonBinUrl = `https://api.jsonbin.io/v3/b/${binId}`;

    // Remplace 'YOUR_API_KEY' par ta clé d'API JSONBin
    const apiKey =
      "$2b$10$./sSv/f/M/JgpEY0veOnxOzSP/axiTaaE5jikEaw0TqAk6w6Wc.SW";

    // Configuration de la requête GET pour récupérer les données actuelles
    const getOptions = {
      method: "GET",
      headers: {
        "X-Master-Key": apiKey,
      },
    };

    fetch(jsonBinUrl, getOptions)
      .then((response) => response.json())
      .then((currentData) => {
        // Get le prochain numéro
        let nextIteration = 1;
        while (currentData.record[`newData${nextIteration}`]) {
          nextIteration++;
        }

        const newKeyName = `newData${nextIteration}`;

        // Ajoute les nouvelles données dans une clé
        currentData.record[newKeyName] = classementState;

        // Met à jour les donnés avec les nouvelles valeurs
        const updatedData = currentData.record;

        // Configuration de la requête PUT pour mettre à jour le bin
        const putOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": apiKey,
          },
          body: JSON.stringify(updatedData),
        };

        localStorage.setItem("LocalData", jsonData);
        // Envoie la requête PUT pour mettre à jour le bin
        return fetch(jsonBinUrl, putOptions);
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Données mises à jour avec succès.");
          // Redirection vers la page final
          push("/finish");
          setIsLoading(false);
        } else {
          console.error("Erreur lors de la mise à jour des données.");
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données actuelles :",
          error
        );
      });
  };

  if (appState[4].isActif === true) {
    return (
      <>
        <div className="relative confirmSession pt-10 flex items-center justify-center">
          <button
            className="relative z-10 px-4 py-2 text-white bg-red-500 font-bold"
            onClickCapture={storeData}
            disabled={isLoading ? true : false}
          >
            CONFIRM
            <span className="absolute bottom-1.5 left-2 bg-white transform rotate-40"></span>
            <span className="absolute bottom-4 -left-0.5 bg-white transform rotate-90"></span>
            <span className="absolute top-1.5 right-2 bg-white transform -rotate-40"></span>
            <span className="absolute top-4 -right-0.5 bg-white transform -rotate-90"></span>
          </button>
        </div>
        {isLoading ? (
          <div className="pt-2 flex justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default ConfirmBoutton;
