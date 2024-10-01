import React from "react";
import NavBar from "./NavBar";
import { BrandProps, NavProps } from "@/types";
import { SearchInput } from "../inputs/SearchInput";

type Props = {
  navigation: NavProps;
  brand: BrandProps;
};

function Header({ navigation, brand }: Props) {
  return (
    <header className={`bg-brand-primary sticky top-0 z-40`}>
      <div className="mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">
        {!!brand?.companyLogo?.url && (
          <a className="block" href="/">
            <img
              src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${brand.companyLogo.url}`}
              alt={
                brand.companyLogo.alt ? brand.companyLogo.alt : "Company Logo"
              }
              width={100}
              height={100}
            />
          </a>
        )}

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <NavBar items={navigation.items} />

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className={`block rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-70`}
                href="#"
              >
                Login
              </a>

              <SearchInput
                placeholder="Search..."
                className="w-64"
                iconClassName=""
              />
            </div>

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
