import { FormLogin } from "@/components/organisms/FormLogin";
import { IntroductionLogin } from "@/components/organisms/IntroductionLogin";

const App = () => {
  return (
    <main className="flex justify-between h-screen p-12 gap-x-12">
      <FormLogin />
      <IntroductionLogin />
    </main>
  );
};

export default App;
