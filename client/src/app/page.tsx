import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link"; 

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <div className={cn("flex justify-end py-4 px-8")}>
          <nav className={cn("space-x-4")}>

            <Link href="/sign-in">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Cadastre-se</Button>
            </Link>
          </nav>
        </div>
        
        <div className="text-center mx-auto px-10 flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
          Cdastro de Recebíveis e Cedentes
            <br></br><strong>AproveMe</strong>
          </h1>
          <h2 className="text-xl text-muted-foreground">
          </h2>
        </div>
     
      </div>

    </>
  );
}
