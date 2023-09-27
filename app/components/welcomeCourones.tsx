"use client";
import CoupeIcon from "@/public/images/welcomePage/coupeIcon";
import { NextPage } from "next";

interface Props {
  colorName: string;
  color: string;
  title: number;
  subtitle: number;
}

const WelcomeCourones: NextPage<Props> = ({ colorName, color, title, subtitle }) => {
  const paragraphStyle: React.CSSProperties = {
    color: color,
  };
  return (
    <>
      <div className="flex items-center space-x-2">
        <CoupeIcon color={colorName} />
        <div>
          <p className="font-bold text-sm text-left" style={paragraphStyle}>{subtitle} Riders</p>
          <p className="text-xs uppercase text-black text-left welcomeCouronesTop">TOP {title}</p>
        </div>
      </div>
    </>
  );
};

export default WelcomeCourones;
