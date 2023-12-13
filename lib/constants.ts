import {
  ArrowDownToLine,
  CheckCircle,
  Banknote,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export const overview = [
  {
    name: "Instant Delivery",
    details:
      "explore our collections and get your assets deliverd to your email in a few clicks and download them right away.",
    icon: ArrowDownToLine,
  },
  {
    name: "Guaranted Quality",
    details:
      "Every asset on our platform is verified by our team to ensure our highest quality standards.",
    icon: CheckCircle,
  },
  {
    name: "Seller Opportunities",
    details:
      "Elevate your role from admirer to creator by signing up as a seller, showcasing your designs to a global audience.",
    icon: Banknote,
  },
];

export const socialLinks = [
  { href: "https://github.com/ahmeds189", icon: Github },
  { href: "https://twitter.com/ahmeddotgg", icon: Twitter },
  {
    href: "https://linkedin.com/in/ahmeds189",
    icon: Linkedin,
  },
];

export const navLinks = [
  { href: "/", title: "Home" },
  { href: "/products", title: "Products" },
  { href: "/sell", title: "Start sell" },
];

export const productsLinks = [
  { href: "/products?category=Icons", title: "Icons" },
  { href: "/products?category=Ui+Kits", title: "Ui Kits" },
  { href: "/products?category=Illustration", title: "Illustration" },
];
