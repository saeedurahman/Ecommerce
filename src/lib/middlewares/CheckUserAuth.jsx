import { useNavigate, Outlet } from "react-router";
import { useAtom } from "jotai";
import { loggedUserAtom } from "../store";
import { routes } from "../utils/constants";

const CheckUserAuth = () => {
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const navigate = useNavigate();

  if (!loggedUser?.accessToken) {
    navigate(routes.LOGIN);
  } else {
    return <Outlet />;
  }
};

export default CheckUserAuth;
