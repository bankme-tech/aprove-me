import React, { useState } from "react";
import Link from "next/link";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";

const NavBar = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="fixed w-full h-28 shadow-xl z-[108]">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <div className="p-3 ml-6">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
        </div>
      </div>
      <div
        className={!nav ? "md:hidden fixed left-0 top-0 w-full h-screen " : ""}
      >
        <div
          className={
            !nav
              ? "md:hidden fixed left-0 top-0 w-[75%] sm:w[60%] md:w[45%] h-screen p-10 ease-in duration-500 bg-white"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <div className="p-3 ml-2">
                <Image src="/logo.png" alt="logo" width={20} height={20} />
              </div>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-blue-500 p-3"
              >
                <AiOutlineClose size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
