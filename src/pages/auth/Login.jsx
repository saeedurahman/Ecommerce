import React, { useState } from "react";
import LoadingButton from "../../components/buttons/LoadingButton";
import FormInput from "../../components/forms/FormInput";
import { LogoImage, routes } from "../../lib/utils/constants";
import { Link, useNavigate } from "react-router";
import { validateSchema } from "../../lib/utils/helpers/validator";
import { LoginSchema } from "../../lib/utils/schemas/AuthSchema";
import axios from "axios";
import { useAtom } from "jotai";
import { loggedUserAtom } from "../../lib/store";
import { LOGIN_URL } from "../../lib/utils/constants/apiRoutes";
import { toast } from "sonner";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [auth, setAuth] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAuth({ ...auth, [name]: value });

    // setAuth((preValue) => {
    //   return { ...preValue, [name]: value };
    // });
  };

  const validateForm = () => {
    let newErrors = validateSchema(auth, LoginSchema);
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);
    // try {
    //   const response = await fetch("https://dummyjson.com/user/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       username: "emilys",
    //       password: "emilyspass",
    //       expiresInMins: 30,
    //     }),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error("Error Occurred:", error);
    // }

    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          username: auth.username,
          password: auth.password,
          expiresInMins: 43200,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setLoggedUser(response.data);
      navigate(routes.HOME);
      toast.success("Logged In Successfully");
    } catch (error) {
      console.error("Error Occurred:", error);
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="px-[120px] py-[35px]">
        <header>
          <Link to={routes.HOME}>
            <img src={LogoImage} alt="Logo" />
          </Link>
        </header>
        <main className="max-w-[360px] mx-auto min-h-[calc(100vh-95px)] flex  justify-center flex-col w-full">
          <h1 className="font-bold text-2xl">Hello, Welcome Back</h1>
          <p className="text-sm text-customGray mt-1 mb-5">
            Please enter your credentials to login.
          </p>
          <div className="bg-customBlackGray px-5 py-10 rounded-[20px] w-full">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <FormInput
                placeholder="Enter Username"
                name="username"
                value={auth.username}
                handleChange={handleChange}
                error={errors?.username}
              />

              <FormInput
                type="password"
                placeholder="Password"
                name="password"
                value={auth.password}
                handleChange={handleChange}
                error={errors?.password}
              />

              <LoadingButton type="submit" isLoading={isLoading}>
                Submit
              </LoadingButton>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
