import { useAppState } from "@/app/api/AppStateContext";

const ConfirmBoutton = () => {
  const { appState, classementState } = useAppState();

  const storeData = () => {

    const jsonData = JSON.stringify(classementState);

    const binId = '6512b9f512a5d376598366df';
    // Définis l'URL de l'API JSONBin
    const jsonBinUrl = `https://api.jsonbin.io/v3/b/${binId}`;

    // Remplace 'YOUR_API_KEY' par ta clé d'API JSONBin
    const apiKey = "$2b$10$./sSv/f/M/JgpEY0veOnxOzSP/axiTaaE5jikEaw0TqAk6w6Wc.SW";

    // Configuration de la requête GET pour récupérer les données actuelles
const getOptions = {
  method: 'GET',
  headers: {
    'X-Master-Key': apiKey,
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey,
      },
      body: JSON.stringify(updatedData),
    };

    // Envoie la requête PUT pour mettre à jour le bin
    return fetch(jsonBinUrl, putOptions);
  })
  .then((response) => {
    if (response.status === 200) {
      console.log('Données mises à jour avec succès.');
    } else {
      console.error('Erreur lors de la mise à jour des données.');
    }
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération des données actuelles :', error);
  });
  };

  if (appState[4].isActif === true) {
    return (
      <div className="relative confirmSession pt-10 flex items-center justify-center">
        <button
          className="relative z-10 px-4 py-2 text-white bg-red-500 font-bold"
          onClickCapture={storeData}
        >
          CONFIRM
          <span className="absolute bottom-1.5 left-2 bg-white transform rotate-40"></span>
          <span className="absolute bottom-4 -left-0.5 bg-white transform rotate-90"></span>
          <span className="absolute top-1.5 right-2 bg-white transform -rotate-40"></span>
          <span className="absolute top-4 -right-0.5 bg-white transform -rotate-90"></span>
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ConfirmBoutton;
