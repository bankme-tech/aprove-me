import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import BankmeLogo from "./BankmeLogo";
import Link from "next/link";
import { getToken, logout } from "@/lib";
import { redirect } from "next/navigation";

export default async function Header() {
  const logged = await getToken();

  return (
    <Navbar shouldHideOnScroll className="bg-gray-100 py-4">
      <NavbarBrand>
        <BankmeLogo />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {logged ? (
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/");
              }}
            >
              <Button type="submit" color="danger" variant="flat">
                Sair
              </Button>
            </form>
          ) : (
            <Button as={Link} color="primary" href="login" variant="flat">
              Entrar
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}