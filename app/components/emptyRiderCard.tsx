"use client";
import { NextPage } from "next";
import { useDrop } from "react-dnd";

interface Props {
  id: number;
  isActif: boolean;
  addImageToBoard: Function;
  showNextRider: Function;
}

const EmptyRiderCard: NextPage<Props> = ({ id, isActif, addImageToBoard, showNextRider }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: any) => {
      addImageToBoard(item.id);
      showNextRider(id, "add", item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
    
      {isActif ? (
        // Si le card est actif 
        <div
          ref={drop}
          className={`w-42 h-40 text-white flex items-center justify-center text-2xl font-bold drop-area bg-red-500`}
        >
          {id + 1}
        </div>
      ) : (
        <div
          ref={null}
          className={`w-42 h-40 text-white flex items-center justify-center text-2xl font-bold drop-area bg-gray-500`}
        >
          {id + 1}
        </div>
      )}
    </>
  );
};

export default EmptyRiderCard;
