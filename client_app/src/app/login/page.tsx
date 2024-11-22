"use client";

import { apiURI } from "@/api/apiFetcher";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginFormInputs {
  usernameOrEmail: string;
  password: string;
}
const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.usernameOrEmail,
            password: data.password,
          }),
          next: { revalidate: 180 },
          // credentials: "include",
        }
      );
      const respData = await response.json();
      setMessage(respData.message);
      // Optionally, save the JWT in localStorage or a cookie
      // localStorage.setItem('jwt': response.data.jwt)
      router.push("/");
    } catch (error: any) {
      console.log("error resp: ", error.response);
      setMessage(
        "Login Failed: " + (error.response?.data?.message || "Unknown error")
      );
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
        {message && (
          <div
            className={`mb-4 p-2 rounded ${
              message.startsWith("Login successful")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.usernameOrEmail ? "border-red-500" : "border-gray-300"
              }`}
              {...register("usernameOrEmail", {
                required: "This field is required",
              })}
            />
            {errors.usernameOrEmail && (
              <p className="mt-1 text-sm text-red-500">
                {errors.usernameOrEmail.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-bue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
