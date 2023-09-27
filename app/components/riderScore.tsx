"use client";
import { NextPage } from "next";
import Image from "next/image";

interface Props {
  score: string;
}

const RiderScore: NextPage<Props> = ({ score }) => {
  return (
    <>
      <div className="relative w-6 h-6">
        <Image
          src="/images/card/saddle.png"
          alt="Image"
          className="w-100 h-100 object-cover"
          width={100}
          height={100}
        />
        <div className="absolute inset-x-0 top-1/4 left-1/3 flex items-center justify-center">
          <p className="font-semibold text-white" style={{fontSize: 8}}>{score}</p>
        </div>
      </div>
    </>
  );
};

export default RiderScore;
