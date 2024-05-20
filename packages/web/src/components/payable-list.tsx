import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

export async function PayableList() {
  return (
    <div className="flex flex-col items-end">
      <Button className="mb-5">Cadastrar novo pagável</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/payable/1" className="">
          <Card>
            <CardHeader>
              <CardTitle>R$100,00</CardTitle>
            </CardHeader>
            <CardContent>
              <p>f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f</p>
            </CardContent>
            <CardFooter>
              <p>Data de emissão 19/05/2024</p>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/payable/1" className="">
          <Card>
            <CardHeader>
              <CardTitle>R$100,00</CardTitle>
            </CardHeader>
            <CardContent>
              <p>f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f</p>
            </CardContent>
            <CardFooter>
              <p>Data de emissão 19/05/2024</p>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/payable/1" className="">
          <Card>
            <CardHeader>
              <CardTitle>R$100,00</CardTitle>
            </CardHeader>
            <CardContent>
              <p>f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f</p>
            </CardContent>
            <CardFooter>
              <p>Data de emissão 19/05/2024</p>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/payable/1" className="">
          <Card>
            <CardHeader>
              <CardTitle>R$100,00</CardTitle>
            </CardHeader>
            <CardContent>
              <p>f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f</p>
            </CardContent>
            <CardFooter>
              <p>Data de emissão 19/05/2024</p>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/payable/1" className="">
          <Card>
            <CardHeader>
              <CardTitle>R$100,00</CardTitle>
            </CardHeader>
            <CardContent>
              <p>f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f</p>
            </CardContent>
            <CardFooter>
              <p>Data de emissão 19/05/2024</p>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
