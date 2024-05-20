import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  to: string
}

export default function MenuItem(props: Props) {
  const { pathname } = useLocation();
  const active = (pathname == props.to);

  return (
    <li className="cursor-pointer group">
      <Link to={props.to} className='flex flex-col gap-1 '>
        <span className={'text-base ease-out duration-200 group-hover:text-themeColor ' + (active && 'text-themeColor')}>{props.children}</span>
        <span className={'w-full h-px ease-out duration-200 group-hover:bg-themeColor ' + (active ? 'bg-themeColor' : 'bg-transparent')}></span>
      </Link>
    </li>
  )
}