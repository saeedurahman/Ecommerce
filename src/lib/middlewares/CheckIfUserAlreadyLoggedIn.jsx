import { useNavigate, Outlet } from "react-router";

import { useAtom } from "jotai";
import { loggedUserAtom } from "../store";
import { routes } from "../utils/constants";

const CheckIfUserAlreadyLoggedIn = () => {
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const navigate = useNavigate();

  if (loggedUser?.accessToken) {
    navigate(routes.HOME);
  } else {
    return <Outlet />;
  }
};

export default CheckIfUserAlreadyLoggedIn;
