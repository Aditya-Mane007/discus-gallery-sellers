"use client";
import React from "react";
// ICONS
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import ModeToggle from "./ModeToggle";
import { Separator } from "./ui/separator";
import { NAV_LINKS } from "@/CONSTANTS";
import Link from "next/link";
import Logo from "../../public/logo.png";
import IsUser from "@/components/IsUser";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const ICONS = {
  Home: <Home />,
  "Add Product": <ShoppingCart />,
  Orders: <Package />,
};

function Sidebar() {
  return (
    <div className="w-full h-full flex flex-col justify-center p-2 max-lg:items-center max-md:px-1">
      <Link
        href="/"
        className="logo flex-none flex justify-center items-center"
      >
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="Discus Gallery Sellers"
        />
        <h1 className="text-lg max-lg:hidden">Discus Gallery Sellers</h1>
      </Link>
      <Separator className="my-2" />
      <div className="flex-1">
        <DesktopNav />
        <MobileNav />
      </div>
      <Separator className="my-4" />
      <div className="flex-none flex flex-col justify-center max-lg:items-center">
        <IsUser />
        <ModeToggle />
      </div>
    </div>
  );
}

export const DesktopNav = () => {
  const path = usePathname();
  return (
    <div className="max-lg:hidden">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.route}
          href={link.route}
          className={clsx(
            path === link.route ? "bg-[#E4E4E7] dark:bg-[#27272A]" : "",
            "flex justify-start items-center my-2 border-transparent border-2 hover:border-2 hover:border-[#E4E4E7] dark:hover:border-[#27272A] rounded"
          )}
        >
          <p className="m-4">{ICONS[link.title]}</p>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
