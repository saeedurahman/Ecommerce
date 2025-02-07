import { Routes, Route } from "react-router";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { routes } from "./lib/utils/constants";
import NotFound from "./pages/misc/NotFound";
import UsersListing from "./pages/users/UsersListing";
import AppLayout from "./components/layout/AppLayout";
import CheckUserAuth from "./lib/middlewares/CheckUserAuth";
import CheckIfUserAlreadyLoggedIn from "./lib/middlewares/CheckIfUserAlreadyLoggedIn";
import ProductsListing from "./pages/products/ProductsListing";
import ProductDetail from "./pages/products/ProductDetail";
import Checkout from "./pages/checkout/Checkout";
import AddEditUser from "./pages/users/AddEditUser";

function App() {
  return (
    <>
      <Routes>
        <Route element={<CheckIfUserAlreadyLoggedIn />}>
          <Route path={routes.LOGIN} element={<Login />} />
        </Route>
        <Route element={<CheckUserAuth />}>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path={routes.PRODUCTS} element={<ProductsListing />} />
            <Route
              path={`${routes.PRODUCTS}/:id`}
              element={<ProductDetail />}
            />
            <Route path={routes.USERS} element={<UsersListing />} />
            <Route path={routes.USERS_ADD} element={<AddEditUser />} />
            <Route
              path={`${routes.USERS_EDIT}/:id`}
              element={<AddEditUser />}
            />
            <Route path={routes.CHECKOUT} element={<Checkout />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
