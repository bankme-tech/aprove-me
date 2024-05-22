import { FormLogin } from "@/components/organisms/FormLogin";
import { IntroductionLogin } from "@/components/organisms/IntroductionLogin";

const App = () => {
  return (
    <div className="mx-auto max-w-screen-xl h-screen                ">
      <main className="flex justify-between h-screen p-12 gap-x-12 ">
        <FormLogin />
        <IntroductionLogin />
      </main>
    </div>
  );
};

export default App;
