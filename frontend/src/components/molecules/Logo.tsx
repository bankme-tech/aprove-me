import LogoStatic from "../../assets/logo-bankme.png";
import { Image } from "../atoms/Image";

export const Logo = () => {
  return (
    <Image
      className="rounded-lg w-full h-auto"
      src={LogoStatic}
      alt="Logo da Bankme"
      layout="responsive"
      width={500}
      height={500}
    />
  );
};
