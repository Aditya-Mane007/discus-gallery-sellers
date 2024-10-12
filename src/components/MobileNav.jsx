import React from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAV_LINKS } from "@/CONSTANTS";
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
import { usePathname } from "next/navigation";

const ICONS = {
  Home: <Home />,
  "Add Product": <ShoppingCart />,
  Orders: <Package />,
};

function MobileNav() {
  const path = usePathname();
  return (
    <div className="mobileNav hidden">
      <TooltipProvider>
        {NAV_LINKS.map((link) => (
          <Tooltip key={link.route}>
            <Link
              href={link.route}
              className={clsx(
                path === link.route ? "bg-[#E4E4E7] dark:bg-[#27272A]" : "",
                "flex justify-start items-center rounded my-1 border-transparent border-2 hover:border-2 hover:border-[#E4E4E7] dark:hover:border-[#27272A]"
              )}
            >
              <TooltipTrigger>
                <p className="m-3">{ICONS[link.title]}</p>
              </TooltipTrigger>
              <TooltipContent>{link.title}</TooltipContent>
            </Link>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}

export default MobileNav;
