import path from "path";
import Header from "./header";
import { useLocation } from 'react-router-dom';
interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { pathname } = useLocation();

  return (
    pathname === '/login' ?
      <> {props.children} </> :
      <>
        <Header />
        <main className="px-6 py-3">
          {props.children}
        </main>
      </>
  )
}