'use client';

import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-10">
            <Image
                src={'/logo-bankme.png'}
                alt="Bankme"
                className="max-w-[100px] h-auto"
                width={913}
                height={1080}
            />
            <p>Desculpe, algo de errado aconteceu!</p>
            <Link 
            href="/"
            className="underline text-blue-600"
            >Ir para a tela de Login</Link>
        </div>
    )
}

export default ErrorPage;