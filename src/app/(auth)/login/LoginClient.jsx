"use client";

import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "@gravity-ui/icons";
import { Button, Input, Label, InputGroup } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const SigninPage = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {

        toast.error(error.message);

        setError("root", {
          type: "manual",
          message: error.message,
        });

        return;
      }

      toast.success("Successfully loggged in!");

      router.push("/");

    } catch (err) {

      console.error(err);

      toast.error("Something went wrong. Please try again.");

      setError("root", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });

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

      toast.error("Google log in failed.");
    }
  };

  const handleForgotPassword = async () => {

    const email = document.querySelector(
      'input[name="email"]'
    )?.value;

    if (!email) {

      toast.error("Please enter your email first");

      return;

    }

    try {

      const { error } =
        await authClient.forgetPassword({
          email,
          redirectTo:
            `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        });

      if (error) {

        toast.error("Failed to send reset email");

        return;

      }

      toast.success(
        "Password reset email sent!"
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to send reset email"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10">

      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-violet-100">

        {/* TITLE */}
        <h2 className="font-bold text-2xl text-center text-gray-900">
          Login to HireLoop
        </h2>

        {/* SIGNUP LINK */}
        <div className="text-sm text-center">

          <span className="text-gray-500">
            No account?
          </span>{" "}

          <Link
            href="/register"
            className="text-violet-600 hover:underline font-medium"
          >
            Register
          </Link>

        </div>

        {/* FORM */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >

          {/* GLOBAL ERROR */}
          {errors.root && (

            <p className="text-red-500 text-sm text-center">
              {errors.root.message}
            </p>

          )}

          {/* EMAIL */}
          <div className="flex flex-col gap-1 text-left">

            <Label>Email</Label>

            <Input
              placeholder="john@example.com"
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

              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>

            )}

          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1 text-left">

            <Label>Password</Label>

            <InputGroup>

              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <InputGroup.Suffix>

                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
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

              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>

            )}

            <div className="flex justify-end mt-2">

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-violet-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-2">

            <Button
              type="submit"
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 w-full sm:w-auto text-white"
            >

              <Check />

              {loading ? "Signing in..." : "Sign In"}

            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="text-violet-600 w-full sm:w-auto"
            >
              Reset
            </Button>

          </div>

          {/* GOOGLE LOGIN */}
          <Button
            onClick={handleGoogleSignIn}
            className="bg-white hover:bg-violet-50 text-black dark:text-white dark:hover:bg-gray-800 border border-violet-200 flex items-center justify-center gap-2 w-full py-2"
          >

            <FaGoogle className="text-violet-500" />

            Continue with Google

          </Button>

        </form>

      </div>

    </div>
  );
};

export default SigninPage;