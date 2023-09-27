"use client";
import Image from "next/image";
import { NextPage } from "next";
import { useDrag } from "react-dnd";
import { useState } from "react";
import RidersData from "../data/ridersData";
import RiderScore from "./riderScore";

interface Props {
  id: number;
  imageURL: string;
  score: string;
  lastName: string;
  firstName: string;
}

const RiderCard: NextPage<Props> = ({
  id,
  imageURL,
  score,
  lastName,
  firstName,
}) => {
  const [isActif, setActif] = useState<boolean>(true);
  const [ridersDataa, setRidersData] = useState(RidersData);

  const updatedRidersData = [...ridersDataa];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        setActif(false);
      }
    },
  }));

  return (
    <>
      {isActif ? (
        <div
          className="card pl-2 pr-2 drop-area"
          style={{
            touchAction: isDragging ? "none" : "auto", // Désactiver le zoom sur le glissement
            cursor: isDragging ? "grabbing" : "grab",
            opacity: isDragging ? 0 : 1,
          }}
        >
          <div className="relative max-w-sm overflow-hidden shadow-lg">
            <Image
              className=" pt-3 flex w-44 h-44 m-1 cavalierImage"
              ref={drag}
              src={imageURL}
              width="130"
              height="144"
              alt="Image principale"
            />

            <div className="absolute inset-x-0 -bottom-1  flex flex-col shadow-lg">
              <Image
                src="/images/card/vague.png"
                width={143}
                height={100}
                alt="Image rouge"
                className="z-10 w-full mr-2 ml-0.5 cavalierImage"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-black">
              <div className="relative top-10 -left-2">
                <RiderScore score={score} />
              </div>
              <div className="relative top-3.5 left-10 uppercase cardTexte">
                <h1
                  className="font-bold mt-0 mb-0"
                  style={{ fontSize: "10px" }}
                >
                  {lastName}
                </h1>
                <h2
                  className="flex top-1 hover:underline"
                  style={{ fontSize: "8px" }}
                >
                  {firstName}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RiderCard;
