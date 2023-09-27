"use client";
import { NextPage } from "next";
import RidersData from "../data/ridersData";
import React, { useState } from "react";
import RiderCard from "./riderCard";
import EmptyRiderCard from "./emptyRiderCard";
import { useAppState } from "../api/AppStateContext";
import RiderCardTuto from "./riderCardTuto";

interface Props {
  id: number;
  isActif: boolean;
  showNextRider: any;
  index: number;
}

type RiderData = {
  id: number;
  lastName: string;
  firstName: string;
  imageURL: string;
  score: string;
};

const RiderCardFillableTuto: NextPage<Props> = ({
  id,
  isActif,
  showNextRider,
  index,
}) => {
  const [board, setBoard] = useState<any>([]);
  const [isActifState, setActif] = useState(true);

  const { appState } = useAppState();

  // Quand on glisse une image et on la met vers le card rouge cette fonction s'éxecute
  const addImageToBoard = (id: number) => {
    // Cherche le card qui a l'id passé en parametre
    const riderCardData = RidersData.find((rider) => rider.id === id);

    // Si le card existe est n'est pas null
    if (riderCardData) {
      // Ajouter les informations du card dans le useState board
      setBoard(riderCardData);
    }

    // Déclarer que le card est Actif
    setActif(false);
  };

  // Quand je clique sur l'image du card cette fonction s'execute (pour supprimer le card de sa place)
  const removeImageFromBoard = (id: number, cardId: number) => {
    const allowedIds = [1, 2, 3];

    if (allowedIds.includes(id)) {
      if (appState[id].isActif === true && appState[id - 1].isActif === false) {
        // Cherche le card grâce a son Id puis enleve l'image et met a la place un card rouge pour acceuillir une nouvelle image
        showNextRider(id, "remove", cardId);
        setActif(true);
      }
    } else {
      if(id === 0 ){

        if (appState[id].isActif == true) {
          // Cherche le card grâce a son Id puis enleve l'image et met a la place un card rouge pour acceuillir une nouvelle image
          showNextRider(id, "remove", cardId);
          setActif(true);
        }
      }else {
          // Cherche le card grâce a son Id puis enleve l'image et met a la place un card rouge pour acceuillir une nouvelle image
          showNextRider(id , "remove", cardId);
          setActif(true);
        
      }
    }
  };

  return isActifState ? (
    // Si le card n'est pas actif (c'est à dire pas d'image de card) cela met le card rouge
    <div className="pt-20 m-1 pl-2 pr-2">
      <EmptyRiderCard
        id={index}
        isActif={isActif}
        showNextRider={showNextRider}
        addImageToBoard={addImageToBoard}
      />
    </div>
  ) : (
    // Sinon met le card avec l'image
    <div
      className="pt-16"
      key={index}
      onClickCapture={() => removeImageFromBoard(index, board.id)}
    >
      <RiderCardTuto
        id={board.id}
        lastName={board.lastName + " e"}
        firstName={board.firstName}
        imageURL={board.imageURL}
        score={board.score}
      />
    </div>
  );
};

export default RiderCardFillableTuto;
