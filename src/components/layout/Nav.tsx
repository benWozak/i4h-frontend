import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  type: "link" | "dropdown";
  link?: { slug: string };
  dropdownItems?: Array<{ label: string; link: { slug: string } }>;
}

interface NavProps {
  items?: NavItem[];
  logo?: string;
}

const Nav: React.FC<NavProps> = ({ items, logo }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      {!!logo && (
        <Link href="/">
          <Image src={logo} alt="Company Logo" width={100} height={50} />
        </Link>
      )}
      <NavigationMenu>
        <NavigationMenuList>
          {!!items &&
            items.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.type === "link" ? (
                  <Link
                    href={`/${item.link?.slug || ""}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  <>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.dropdownItems?.map(
                          (dropdownItem, dropdownIndex) => (
                            <li key={dropdownIndex}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/${dropdownItem.link.slug}`}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  )}
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {dropdownItem.label}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          )
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Nav;
