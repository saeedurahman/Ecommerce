import { ContactIcon, FunctionsIcon } from "./icons";
import { routes } from "./routes";
import { House, ShoppingCart } from "lucide-react";

export const sidebarRoutes = [
  {
    label: "Home",
    path: routes.HOME,
    icon: <House />,
  },
  {
    label: "Products",
    path: routes.PRODUCTS,
    icon: <ShoppingCart />,
  },
  {
    label: "Users",
    path: routes.USERS,
    icon: <ContactIcon className="customIconPathFill" />,
  },
];
