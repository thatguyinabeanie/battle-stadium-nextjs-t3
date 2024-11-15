"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@battle-stadium/ui";

type HREF = `/${string}`;

interface NavbarLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  href: HREF;
  value: string;
  label: string;
  className?: string;
}

export const NavbarLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  NavbarLinkProps
>(({ value, href, className, label, ...props }, ref) => (
  <Link
    prefetch={true}
    key={value}
    ref={ref}
    href={href}
    className={`${usePathClassName(href)} ${className}`}
    {...props}
  >
    {label}
  </Link>
));

function usePathClassName(href: `/${string}`) {
  const pathname = usePathname();

  return cn("rounded-md px-1 py-2 text-sm font-medium transition-colors", {
    "bg-primary/10 text-primary": pathname === href,
    "text-muted-foreground hover:bg-accent hover:text-accent-foreground":
      pathname !== href,
  });
}
export default NavbarLink;
