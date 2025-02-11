import React from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Menu } from "lucide-react";

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
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">{logo}</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-1 justify-center">
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
                              href={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
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
        <div className="hidden md:flex items-center space-x-4">
          <Button onClick={onContactClick} variant="ghost">
            Contact Us
          </Button>
          <Button variant="ghost" asChild>
            <a href="/admission">Admission</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/login">Log in</a>
          </Button>
          <Button asChild>
            <a href="/signup">Sign up</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => console.log("Mobile menu clicked")}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
