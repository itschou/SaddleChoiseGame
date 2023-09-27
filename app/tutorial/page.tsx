"use client";
import RidersData from "../data/ridersData";
import RiderCardTuto from "../components/riderCardTuto";
import { useEffect, useState } from "react";
import React from "react";
import { useAppState } from "../api/AppStateContext";

import ConfirmBoutton from "./components/confirmBoutton";
import ConfirmText from "./components/confirmText";
import RiderCardFillableTuto from "../components/riderCardFillableTuto";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Tutorial = () => {
  const [ridersDataa, setRidersData] = useState(RidersData);
  const [data, setData] = useState(RidersData);
  const [tutorialTextTitle, setTutorialTextTitle] = useState(
    "DRAG THIS PILOT CARD TO THE TOP SPOT!"
  );
  const [tutorialTextSubtitle, setTutorialTextSubtitle] = useState("");
  const [steps, setSteps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const { push } = useRouter();

  const {
    appState,
    classementState,
    updateAddItemById,
    updateAddClassement,
    updateRemoveClassement,
  } = useAppState();

  const handleStateChange = (title:string, subtitle:string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setTutorialTextTitle(title)
      setTutorialTextSubtitle(subtitle)
      setIsAnimating(false);
    }, 1000);
  };

  // useEffect pour observer les changements d'état
  //     useEffect(() => {
  //   console.log("Nouvel état : ", classementState);
  //     }, [classementState]);

  const showNextRider = (id: number, type: string, cardid: number) => {
    const updatedRidersData = [...ridersDataa];
    if (type === "add") {
      setSteps(1);
      handleStateChange("CHANGE YOUR MIND?", "REPLACE THE PILOT CARD IN ITS INITIAL POSITION BY CLICKING ON IT");
      updateAddClassement(
        updatedRidersData[cardid].firstName +
          " " +
          updatedRidersData[cardid].lastName
      );
      if (updatedRidersData[id].id != updatedRidersData[4].id) {
        // Relalive au cards avec les nombres
        updatedRidersData[id].isActif = false;
        updatedRidersData[id + 1].isActif = true;

        // console.log("id: " + id +  " cardId: " + cardid);
        updateAddItemById(id); // Met le isActif de cet item avec cet id en False

        // Mise à jour de la Data pour faire un mapping
        setRidersData(updatedRidersData);
      } else {
        updatedRidersData[id].isActif = true;

        updateAddItemById(id);
        // Mise à jour de la Data pour faire un mapping
        setRidersData(updatedRidersData);
      }
    } else {
      handleStateChange("GREAT, GOOD JOB", "YOU'LL BE STARTING IN A MOMENT...");
      updateRemoveClassement();
      if (cardid != updatedRidersData.length + 1) {
        if (updatedRidersData[id + 1]?.isActif === true) {
          // Mettre la data pour afficher les cards en haut à jour
          const oldData = [...data];
          const newData = oldData.find((rider) => rider.id === cardid);
          const FiltredData: any = [...data, newData];
          setData(FiltredData);

          updateAddItemById(id - 1); // Met le isActif de cet item avec cet id en True
        } else {
          // annuler l'action
          updateAddItemById(id - 1); // Met le isActif de cet item avec cet id en True
        }

        // A supprimer après les testes
        // console.log("calavierId : ", cardid);
        // console.log("cardId : ", id);

        // Vérifier si le card que je veux supprimer de la liste est le dernier sinon ne rien faire
        if (id != 4) {
          if (updatedRidersData[id + 1].isActif === true) {
            // Quand un choix est fait et posé dans le card le card suivant est mis en rouge pour poser un nouveau card
            switch (id) {
              case 0:
                updatedRidersData[0].isActif = true;
                updatedRidersData[1].isActif = false;
                break;
              case 1:
                updatedRidersData[1].isActif = true;
                updatedRidersData[2].isActif = false;
                break;
              case 2:
                updatedRidersData[2].isActif = true;
                updatedRidersData[3].isActif = false;
                break;
              case 3:
                updatedRidersData[3].isActif = true;
                updatedRidersData[4].isActif = false;
                break;
              default:
                updatedRidersData[4].isActif = true;
                break;
            }
          }
        } else {
          updatedRidersData[4].isActif = true;

          // Mettre la data pour afficher les cards en haut à jour
          const oldData = [...data];
          const newData = oldData.find((rider) => rider.id === cardid);
          const FiltredData: any = [...data, newData];
          setData(FiltredData);
        }
        // Mise à jour de la Data pour faire un mapping
        setRidersData(updatedRidersData);
        setTimeout(() => {
          push('/start');
        }, 3000);
      } else {
        // Remettre la data pour afficher les cards en haut à jour
        const oldData = [...data];
        const newData = oldData.find((rider) => rider.id === cardid);
        const FiltredData: any = [...data, newData];
        setData(FiltredData);

        updatedRidersData[id].isActif = true;
        setRidersData(updatedRidersData);
        updateAddItemById(id - 1);
      }
    }
  };

  return (
    <div>
      <div className="tutorialMainDiv z-30"></div>
      <Image src="/images/card/click.png" alt="Click Image" className={steps === 0 ? `absolute flex image-animation z-50` : `absolute flex image-animation-static z-50`} width={100} height={100} />
      <div className="m-0">
        <div className="pt-9">
          <h1 className="flex items-center justify-center font-bold">
            CWD CHAMPIONS CUP
          </h1>
          <p className="text-black text-center text-sm">We care. They ride.</p>
        </div>

        <div className="pt-5 tutorialTitle">
          <h1 className="flex items-center justify-center font-bold uppercase">
            PREDICT THE RANKING OF CWD RIDERS AT THE FEI 5* WORLD CUP IN
            TORONTO.
          </h1>
          {/* Afficher le texte après avoir fini le jeu */}
          <ConfirmText />
        </div>

        <div className="tutorialText">
          <h1 className={`text-center font-sans text-white relative z-50 text-3xl top-32 left-24 whitespace-pre-line ${ isAnimating ? 'fadeOut' : 'fadeIn' } transition-opacity`}>
            {tutorialTextTitle}
          </h1>
          <p className={`text-center font-sans text-white relative z-50 top-32 whitespace-pre-line ${ isAnimating ? 'fadeOut' : 'fadeIn' } transition-opacity`}>
            {tutorialTextSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-5">
          {data.map((rider: any, index: number) => {
            return (
              <RiderCardTuto
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

        <div className="grid grid-cols-5">
          {ridersDataa.map((item, index) => {
            return (
              <div key={index} className={index === 0 ? "z-40" : ""}>
                <RiderCardFillableTuto
                  id={item.id}
                  index={index}
                  isActif={item.isActif}
                  showNextRider={showNextRider}
                />
              </div>
            );
          })}
        </div>

        {/* Afficher le boutton après avoir fini le jeu */}
        <ConfirmBoutton />
      </div>
    </div>
  );
};

export default Tutorial;
