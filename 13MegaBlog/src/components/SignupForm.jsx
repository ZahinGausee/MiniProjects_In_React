import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userdata = await authService.getCurrentUser();
        if (userdata) dispatch(authLogin(userdata));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h1 className="text-center text-2xl font-bold leading-tight">
          Sign Up
        </h1>
        <p className="mt-2 text-center text-base text-black/60">
          If you already have an account&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Name: "
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              type="email"
              placeholder="Enter your email"
              label="Email: "
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
