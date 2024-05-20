'use client';
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  const handleClick = () => {
    logout();
    localStorage.clear();
  };

  useEffect(() =>{
    console.log('Header useEffect', user);
  });

  return(
    <header>
      <nav className="bg-gray-900 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="text-blue-600 self-center text-4xl font-semibold whitespace-nowrap">
            Bankme
          </Link>
          <div className="flex items-center lg:order-2">
            {user && <button onClick={ handleClick } className="bg-blue-600 text-white hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
              Sair
            </button>}
            {user ? <Link href="/profile" className="bg-blue-600 text-white hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Meu Perfil
            </Link> : 
            <Link href="/auth" className="bg-blue-600 text-white hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Login
            </Link> 
            }
          </div>
        </div>
      </nav>
    </header>
  )
}
