import Recipe from "@/interfaces/recipes";
import { Disclosure } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Search from "./search";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Recipe Catalogue", href: "/allrecipes" },
];

type Props = {
  allRecipes: Recipe[];
};

const Header = ({ allRecipes }: Props) => {
  return (
    <Disclosure as="nav" className="mb-20 bg-neutral-100 px-8 py-8">
      {({ open }) => (
        <>
          <div className="items-center justify-between flex flex-1 text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <Link href="/" className="hover:underline">
              Two rookie cooks
            </Link>

            <div className="max-w-7xl px-2 lg:px-8 block md:hidden">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-0 flex items-center md:hidden"></div>
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <div className="float-right text-lg hidden md:flex md:align-middle md:items-center">
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className="px-6 align-middle hover:underline"
                >
                  {item.name}
                </Link>
              ))}
              <Search allRecipes={allRecipes} />
            </div>
          </div>

          <Disclosure.Panel className="md:hidden absolute z-10 right-0 bg-neutral-100 w-full">
            {({ close }) => (
              <div className="pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="text-gray-800 block rounded-md px-8 py-2 text-base font-medium"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Search allRecipes={allRecipes} className={"px-8 py-2"} onClick={() => close()}/>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
