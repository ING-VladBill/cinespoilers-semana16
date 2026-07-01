import { Film, Menu, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Movies",
    href: "/movies",
  },
];

export function Navbar() {
  const itemCount = useCartStore((state) => state.items.length);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Film className="h-5 w-5 text-blue-600" />

          <span className="text-lg">
            CineSpoilerS
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
            >
              <NavLink to={item.href}>
                {item.label}
              </NavLink>
            </Button>
          ))}

          <Button asChild variant="ghost" className="relative">
            <NavLink to="/cart">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
                  {itemCount}
                </span>
              )}
            </NavLink>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <div className="mt-8 flex flex-col gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className="justify-start"
                >
                  <NavLink to={item.href}>
                    {item.label}
                  </NavLink>
                </Button>
              ))}

              <Button asChild variant="ghost" className="justify-start">
                <NavLink to="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  Carrito {itemCount > 0 && `(${itemCount})`}
                </NavLink>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}