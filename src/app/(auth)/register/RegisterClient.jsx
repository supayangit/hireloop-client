"use client";

import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  InputGroup,
} from "@heroui/react";
import Link from "next/link";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const SignupPage = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  // PASSWORD VALIDATION
  const validatePassword = (password) => {

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase) {
      return "Password must contain at least 1 uppercase letter";
    }

    if (!hasLowercase) {
      return "Password must contain at least 1 lowercase letter";
    }

    if (!hasMinLength) {
      return "Password must be at least 6 characters long";
    }

    return true;
  };

  const onSubmit = async (data) => {

    const passwordCheck = validatePassword(data.password);

    if (passwordCheck !== true) {

      toast.error(passwordCheck);

      setError("password", {
        type: "manual",
        message: passwordCheck,
      });

      return;
    }

    clearErrors("password");

    try {

      setLoading(true);

      const { data: res, error } =
        await authClient.signUp.email({

          name: data.name,
          image: data.image_url,
          role: "seeker",
          email: data.email,
          password: data.password,

        });

      if (error) {

        toast.error(error.message);

        return;
      }

      if (res) {

        toast.success(
          "Account created successfully! Please verify."
        );

        router.push("/");
      }

    } catch (err) {

      console.error(err);

      toast.error("Something went wrong!");

    } finally {

      setLoading(false);

    }
  };

  const handleGoogleSignIn = async () => {

    try {

      await authClient.signIn.social({
        provider: "google",
      });

      toast.success("Login in with Google...");

    } catch (err) {

      console.error(err);

      toast.error("Google login failed.");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 bg-black relative overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-md space-y-6 bg-white/[0.03] p-8 rounded-2xl border border-white/10 backdrop-blur-xl">

        {/* TITLE */}
        <h2 className="font-bold text-2xl text-center text-white">
          Create Your HireLoop Account
        </h2>

        {/* SIGN IN LINK */}
        <div className="text-sm text-center">

          <span className="text-gray-400">
            Already have an account?
          </span>{" "}

          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
          >
            Login
          </Link>

        </div>

        {/* FORM */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >

          {/* NAME */}
          <div className="flex flex-col gap-1 text-left">

            <Label className="text-white">Name</Label>

            <Input
              placeholder="John Doe"
              className="bg-white/[0.05] border-white/10 text-white placeholder-gray-500"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "At least 2 characters required",
                },
              })}
            />

            {errors.name && (

              <p className="text-red-400 text-sm">
                {errors.name.message}
              </p>

            )}

          </div>

          {/* IMAGE */}
          <div className="flex flex-col gap-1 text-left">

            <Label className="text-white">Image URL</Label>

            <Input
              placeholder="https://example.com/image.jpg"
              className="bg-white/[0.05] border-white/10 text-white placeholder-gray-500"
              {...register("image_url", {
                required: "Image URL is required",
                pattern: {
                  value: /^(https?:\/\/)[^\s$.?#].[^\s]*$/i,
                  message: "Enter a valid URL",
                },
              })}
            />

            {errors.image_url && (

              <p className="text-red-400 text-sm">
                {errors.image_url.message}
              </p>

            )}

          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1 text-left">

            <Label className="text-white">Email</Label>

            <Input
              placeholder="john@example.com"
              className="bg-white/[0.05] border-white/10 text-white placeholder-gray-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
            />

            {errors.email && (

              <p className="text-red-400 text-sm">
                {errors.email.message}
              </p>

            )}

          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1 text-left">

            <Label className="text-white">Password</Label>

            <InputGroup>

              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter password"
                className="bg-white/[0.05] border-white/10 text-white placeholder-gray-500"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <InputGroup.Suffix>

                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                  onPress={() => setIsVisible(!isVisible)}
                >

                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}

                </Button>

              </InputGroup.Suffix>

            </InputGroup>

            {errors.password && (

              <p className="text-red-400 text-sm">
                {errors.password.message}
              </p>

            )}

            {/* PASSWORD RULES */}
            <ul className="text-xs text-gray-400 mt-1 space-y-1">
              <li>• At least 6 characters</li>
              <li>• At least 1 uppercase letter</li>
              <li>• At least 1 lowercase letter</li>
            </ul>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-2">

            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto text-white"
            >

              <Check />

              {loading ? "Creating..." : "Register"}

            </Button>

            <Button
              type="reset"
              variant="bordered"
              className="text-white border-white/20 hover:bg-white/10 w-full sm:w-auto"
            >
              Reset
            </Button>

          </div>

          {/* GOOGLE LOGIN */}
          <Button
            onClick={handleGoogleSignIn}
            className="bg-white/[0.05] hover:bg-white/10 text-white border border-white/20 flex items-center justify-center gap-2 w-full py-2"
          >

            <FaGoogle className="text-indigo-400" />

            Continue with Google

          </Button>

        </form>

      </div>

    </div>
  );
};

export default SignupPage;