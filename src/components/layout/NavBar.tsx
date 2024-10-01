"use client";

import * as React from "react";
import Link from "next/link";

import { DropdownItem, NavItem } from "@/types";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface Props {
  items: NavItem[];
}

export default function NavBar({ items }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-col md:flex-row">
        {!!items &&
          items.map((item: NavItem, index: number) => {
            if (item?.dropdownItems?.length) {
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-x-3 p-6 w-screen md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
                      {item.dropdownItems.map(
                        (dropdownItem: DropdownItem, index: number) => {
                          if (dropdownItem.isPrimary) {
                            return (
                              <li key={index} className={`row-span-4`}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                    href={`/${dropdownItem.link.slug}`}
                                  >
                                    <div className="mb-2 mt-4 text-lg font-medium">
                                      {item.label}
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                      {dropdownItem.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            );
                          } else {
                            return (
                              <ListItem
                                key={index}
                                href={`/${dropdownItem.link.slug}`}
                                title={dropdownItem.label}
                              >
                                {dropdownItem.description}
                              </ListItem>
                            );
                          }
                        }
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            } else {
              return (
                <NavigationMenuItem key={index}>
                  <Link href={`/${item.link.slug}`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            }
          })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
