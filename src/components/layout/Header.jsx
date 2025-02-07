import { LogOut, Menu, ShoppingCart } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { cartAtom, loggedUserAtom } from "../../lib/store";
import { useAtom } from "jotai";
import { routes } from "../../lib/utils/constants";
import { toast } from "sonner";

const Header = () => {
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const [cart, setCart] = useAtom(cartAtom);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const memoizedtotalQuantity = useMemo(() => {
    return cart?.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const handleLogout = () => {
    setLoggedUser({});
    navigate(routes.LOGIN);
    toast.success("Logged Out Successfully");
  };
  console.log("open", open);
  return (
    <>
      <header className="bg-customDarkBlue flex items-center h-16 sticky top-0 left-[230px] w-full px-5">
        <div className="flex items-center justify-between w-full">
          <button onClick={handleOpen}>
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-5">
            <div className="relative">
              <Link to={routes.CHECKOUT}>
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {memoizedtotalQuantity}
                  </span>
                )}
              </Link>
            </div>
            <button onClick={handleLogout}>
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
