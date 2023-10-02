"use client";
import Logo from "@/public/images/welcomePage/Logo";
import { useRouter } from "next/navigation";

import data from "./data/welcomeData";
import WelcomeCourones from "./components/welcomeCourones";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const goToTutorial = () => {
    const path = `tutorial.html`;
    router.push(path);
  };
  return (
    <div>
      {/* Header */}
      <div className="p-2 welcomeHeader">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <p className="text-white text-center text-sm">We care. They ride.</p>
      </div>

      {/* Section 1 */}
      <div className="pt-6 pb-6 welcomeMiddle text-center">
        <h1 className="text-bold">WHO WILL BE THE BEST</h1>
        <h1 className="text-bold">CWD RIDER OF THE COMPETITION?</h1>
        <div className="pt-3 pb-3">
          <button
            onClick={goToTutorial}
            className="hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            PLAY!
          </button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="welcomeEnd pt-5 text-center">
        <p>
          PROUD OF THE <span className="text-red-500">RED</span> TEAM{" "}
        </p>
        <div className="grid grid-cols-5 gap-4 pt-5">
          {data.map((item, index) => {
            return (
              <div key={index}>
                <WelcomeCourones
                  colorName={item.colorName}
                  title={item.classement}
                  color={item.color}
                  subtitle={item.number}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Message en bas */}

      <div className="text-right welcomeEndText">
        <p>Source : FEI Longines Jumping Ranking</p>
      </div>
    </div>
  );
}
