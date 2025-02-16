import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  logo?: string;
  menuItems?: Array<{
    label: string;
    href: string;
    subItems?: Array<{ label: string; href: string; description?: string }>;
  }>;
  onContactClick?: () => void;
}

const Header = ({
  logo = "DHI Classes",
  menuItems = [
    {
      label: "Simulation",
      href: "simulation",
    },
    {
      label: "Kids Game",
      href: "game",
    },
    {
      label: "Courses",
      href: "#courses",
      subItems: [
        {
          label: "Mathematics",
          href: "#mathematics",
          description: "Master fundamental mathematical concepts",
        },
        {
          label: "Physics",
          href: "#physics",
          description: "Understand the laws of the universe",
        },
        {
          label: "Chemistry",
          href: "#chemistry",
          description: "Explore the world of molecules",
        },
      ],
    },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  onContactClick = () => console.log("Contact clicked"),
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          {logo}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.subItems ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          {item.subItems.map((subItem) => (
                            <NavigationMenuLink
                              key={subItem.label}
                              onClick={() => handleNavigation(subItem.href)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.label}
                              </div>
                              {subItem.description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {subItem.description}
                                </p>
                              )}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      onClick={() => handleNavigation(item.href)}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button onClick={onContactClick} variant="ghost">
            Contact Us
          </Button>
          <Button variant="ghost" onClick={() => navigate("admission")}>
            Admission
          </Button>
          <Button variant="outline" onClick={() => navigate("login")}>
            Log in
          </Button>
          <Button onClick={() => navigate("signup")}>Sign up</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          ref={menuButtonRef}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg"
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.subItems ? (
                    <div className="space-y-2">
                      <div className="font-medium">{item.label}</div>
                      <ul className="pl-4 space-y-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.label}>
                            <button
                              onClick={() => handleNavigation(subItem.href)}
                              className="text-gray-600 hover:text-primary"
                            >
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="text-gray-900 hover:text-primary"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-4">
              <Button
                onClick={() => {
                  onContactClick();
                  setIsMobileMenuOpen(false);
                }}
                variant="ghost"
                className="w-full justify-start"
              >
                Contact Us
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("admission");
                  setIsMobileMenuOpen(false);
                }}
              >
                Admission
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("login");
                  setIsMobileMenuOpen(false);
                }}
              >
                Log in
              </Button>
              <Button
                className="w-full justify-start"
                onClick={() => {
                  navigate("signup");
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
