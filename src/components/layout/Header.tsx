"use client";
import React, { useState } from "react";
import NavBar from "./NavBar";
import { BrandProps, NavProps } from "@/types";
import { SearchInput } from "../inputs/SearchInput";

type Props = {
  navigation: NavProps;
  brand: BrandProps;
};

function Header({ navigation, brand }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`bg-brand-primary sticky top-0 z-40`}>
      <div className="mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">
        {!!brand?.companyLogo?.url && (
          <a className="block" href="/">
            <img
              src={`${brand.companyLogo.url}`}
              alt={
                brand.companyLogo.alt ? brand.companyLogo.alt : "Company Logo"
              }
              width={100}
              height={100}
            />
          </a>
        )}

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <div className="hidden md:block">
            <NavBar items={navigation.items} />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-4">
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
          </div>

          <button
            className="md:hidden rounded p-2.5 text-gray-100 transition hover:text-gray-200/75"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="p-4">
            <SearchInput
              placeholder="Search..."
              className="w-full"
              iconClassName=""
            />
          </div>
          <div className="flex items-center justify-center p-4">
            <NavBar items={navigation.items} />
          </div>
          <div className="p-4">
            <a
              className={`block rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-70 text-center mb-4`}
              href="#"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
