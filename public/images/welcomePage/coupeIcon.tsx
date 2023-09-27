"use client";
import Image from "next/image";
import CouroneRougeDark from "../welcomePage/couronnes/couroneRougeDark.png";
import CouroneRouge from "../welcomePage/couronnes/couroneRouge.png";
import CouroneOrange from "../welcomePage/couronnes/couroneOrange.png";
import { NextPage } from "next";

interface Props {
  color: string;
}

const CoupeIcon: NextPage<Props> = ({ color }) => {
  switch (color.toString()) {
    case "dark-red":
      return (
        <Image
          src={CouroneRougeDark}
          alt="courone Icon"
          priority={false}
          width={30}
          height={30}
        />
      );
    case "red":
      return (
        <Image
          src={CouroneRouge}
          alt="courone Icon"
          priority={false}
          width={30}
          height={30}
        />
      );

    default:
      return (
        <Image
          src={CouroneOrange}
          alt="courone Icon"
          priority={false}
          width={30}
          height={30}
        />
      );
  }
};

export default CoupeIcon;
