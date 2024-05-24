import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import BankmeLogo from "./BankmeLogo";
import Link from "next/link";

export default function Header() {
    return (
        <Navbar shouldHideOnScroll>
          <NavbarBrand>
            <BankmeLogo />
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button as={Link} color="primary" href="login" variant="flat">
                Entrar
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
    )
}