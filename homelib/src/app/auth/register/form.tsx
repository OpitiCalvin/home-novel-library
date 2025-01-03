"use client";

import { registrationSchema } from "@/formValidators/userRegistration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

type RegistrationData = z.infer<typeof registrationSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({ resolver: zodResolver(registrationSchema) });

  const router = useRouter();

  const onSubmit = async (data: RegistrationData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("User registration Failed");
      }
      const { message } = await res.json();
      toast.success(message);
      router.push("/auth/login");
      router.refresh()
    } catch (error) {
      console.error("Validatiaon Error", error);
      toast.error("Error occurred while attempting user registration");
      toast.error("User Registraion Failed!!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus-ring-blue-500 focus:border-blue-5oo`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus-ring-blue-500 focus:border-blue-5oo`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus-ring-blue-500 focus:border-blue-5oo`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
