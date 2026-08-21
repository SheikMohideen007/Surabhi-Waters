import { solutions } from "./solutions";

export type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string; description: string }[];
};

export const navLinks: NavLink[] = [
  {
    href: "/solutions",
    label: "Solutions",
    children: solutions.map((solution) => ({
      href: `/solutions/${solution.slug}`,
      label: solution.name,
      description: solution.tagline,
    })),
  },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
