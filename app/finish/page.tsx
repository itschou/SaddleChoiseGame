"use client";

import { useAppState } from "../api/AppStateContext";
import RiderCard from "../components/riderCard";

const Finish = () => {
  const { classementStateItem } = useAppState();

  var name = localStorage.getItem("LocalData");

  if (name !== null) {
    // Si la valeur n'est pas null, elle peut être utilisée en tant que chaîne de caractères
    var parsedData = JSON.parse(name);

    // Maintenant, parsedData contient un tableau ou un objet JavaScript
  } else {
    // Gérer le cas où la clé "LocalData" n'existe pas ou est null
    // Peut-être initialiser parsedData à une valeur par défaut
  }
  return (
    <div className="m-0">
      <div className="pt-9">
        <h1 className="flex items-center justify-center font-bold">
          CWD CHAMPIONS CUP
        </h1>
        <p className="text-black text-center text-sm">We care. They ride.</p>
      </div>

      <div className="pt-5">
        <div className="grid grid-cols-5">
          {parsedData?.map((rider: any, index: number) => {
            return (
              <RiderCard
                id={rider.id}
                key={index}
                lastName={rider.lastName}
                firstName={rider.firstName}
                imageURL={rider.imageURL}
                score={rider.score}
              />
            );
          })}
        </div>
      </div>
      <div className="pt-16">
      <p className="text-black text-center text-2xl font-bold">CONFIRM MY ENTRY</p>

      </div>
    </div>
  );
};

export default Finish;
