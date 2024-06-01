import { Button } from "../atoms/Button";
import { Logo } from "../molecules/Logo";

export const IntroductionLogin = () => {
  return (
    <div className=" bg-primary-dark  text-white rounded-3xl w-1/2 h-full flex flex-col justify-between">
      <div className="flex justify-center items-center w-full h-full p-12 bg-success rounded-3xl ">
        <div className=" w-full h-full">
          <Logo />
        </div>
      </div>
      <div className="flex-grow flex items-center justify-between  rounded-3xl bg-primary-dark min-h-28 px-4">
        <p className="pl-4 text-2xl text-white ">Junte se a nós </p>
        <div className="w-1/3">
          <Button>Cadastrar</Button>
        </div>
      </div>
    </div>
  );
};
