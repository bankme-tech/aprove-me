'use client';
import Link from "next/link";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function Header() {
  const { isLogged, setIsLogged } = useAuthContext();

  const handleClick = () => {
    setIsLogged(false);
    localStorage.clear();
  };

  useEffect(() =>{
    const token = localStorage.getItem('user');
    if (token) {
      setIsLogged(true);
      return;
    }
    
    setIsLogged(false);
  });

  return(
    <header className="flex flex-wrap justify-around items-center bg-gray-900 border-gray-200 py-5">
      <div>
        <h1 className="text-5xl font-bold font-poppins">
          <Link href='/' className="text-blue-500">Bankme</Link>
        </h1>
      </div>
      <nav>
        <div className="flex items-center">
          {isLogged && <button onClick={ handleClick } className="bg-blue-600 text-white hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-10 py-3 focus:outline-none">
            Sair
          </button>}
          {isLogged ? '' : 
          <Link href="/auth/login" className="bg-blue-600 text-white hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-10 py-3 focus:outline-none">Login
          </Link> 
          }
        </div>
      </nav>
    </header>
  )
}
