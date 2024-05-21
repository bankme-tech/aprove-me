'use client';
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

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
    <header className="flex flex-wrap justify-around items-center bg-gray-900 border-gray-200 py-5">
      <div>
        <h1 className="text-5xl font-bold font-poppins">
          <span className="text-blue-500">Bankme</span>
        </h1>
      </div>
      <nav>
        <div className="flex items-center">
          {user && <button onClick={ handleClick } className="bg-blue-600 text-white hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 focus:outline-none">
            Sair
          </button>}
          {user ? <Link href="/profile" className="bg-blue-600 text-white hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-10 py-3 focus:outline-none">Meu Perfil
          </Link> : 
          <Link href="/auth/login" className="bg-blue-600 text-white hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-10 py-3 focus:outline-none">Login
          </Link> 
          }
        </div>
      </nav>
    </header>
  )
}
