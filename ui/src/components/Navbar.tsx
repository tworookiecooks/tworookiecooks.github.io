import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import Search from "./Search";
import { Recipe } from "@/models/Recipe";

type Props = {
  recipes: Recipe[];
};

export default function NavBar({ recipes }: Props) {
  const pathName = usePathname();
  return (
    <Navbar
      isBordered
      className="position='sticky' flex relative h-20 items-center top-0 bg-navbar"
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="cursor-pointer" aria-label="Home">
            <Image
              src={`/assets/trc-logo.png`}
              alt="Two Rookie Cooks"
            />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4">
          <NavbarItem isActive={pathName === "/"}>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathName === "/explore"}>
            <Link href="/explore" aria-current="page" color="secondary">
              Recipe Catalogue
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <div>
          <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none text-black">
            <IoIosSearch />
          </div>
          <Search allRecipes={recipes} />
        </div>
      </NavbarContent>
    </Navbar>
  );
}
