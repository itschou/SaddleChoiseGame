import Image from "next/image";
import LogoImage from '../welcomePage/logo_champions.png';

const Logo = () => {
  return (
    <div className="welcomeHeaderImage">
      <Image src={LogoImage} className="w-full" priority={false} alt="Logo Image"/>
    </div>
  );
};

export default Logo;
