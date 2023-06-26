import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import Bankeme from "../public/assets/svg/bankme.svg";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#FFFFFF");
  const [linkColor, setLinkColor] = useState("#1f2937");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-300"
          : "fixed w-full h-20 z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <a>
            <Image src={Bankeme} alt="/" className="cursor-pointer" />
          </a>
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <li className="ml-10 text-sm uppercase hover:border-b font-bold text-blue-500">
              <Link href="/">Home</Link>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b font-bold text-blue-500">
              <Link href="/cedente">CEDENTE</Link>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b font-bold text-blue-500">
              <Link href="/listagem">LISTAGEM</Link>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b font-bold text-blue-500 pr-8">
              <Link href="/">PAGAVEIS</Link>
            </li>
          </ul>

          <div
            style={{ color: `${linkColor}` }}
            onClick={handleNav}
            className="md:hidden"
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#FFFFFF] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <a>
                  <Image src={Bankeme} alt="/" />
                </a>
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <Link href="/">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm font-bold text-blue-500"
                >
                  Home
                </li>
              </Link>
              <Link href="/cedente">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm font-bold text-blue-500"
                >
                  cedente
                </li>
              </Link>
              <Link href="/listagem">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm font-bold text-blue-500"
                >
                  LISTAGEM
                </li>
              </Link>
              <Link href="/pagaveis">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm font-bold text-blue-500"
                >
                  PAGAVEIS
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
