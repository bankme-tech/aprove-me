import { Button } from "../atoms/Button";
import { Logo } from "../molecules/Logo";

export const IntroductionLogin = () => {
  return (
    <div className=" bg-primary-dark  text-white rounded-3xl w-1/2 h-full flex flex-col justify-between">
      <div className="flex items-center justify-end w-full p-12 bg-success rounded-3xl h-full">
        <Logo />
      </div>
      <div className="flex-grow flex items-center justify-end  rounded-3xl bg-primary-dark min-h-28 px-4">
        <div className="w-1/3">
          <Button label="Cadastrar" />
        </div>
      </div>
    </div>
  );
};
