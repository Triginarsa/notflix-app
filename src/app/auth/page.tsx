"use client";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState<"login" | "signup">("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "signup" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="Netflix Logo"
            width={150}
            height={50}
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "signup" && (
                <Input
                  id={"username"}
                  onChange={(ev) => setUsername(ev.target.value)}
                  value={username}
                  label={"Username"}
                  type={"text"}
                />
              )}
              <Input
                id={"email"}
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
                label={"Email"}
                type={"email"}
              />
              <Input
                id={"password"}
                onChange={(ev) => setPassword(ev.target.value)}
                value={password}
                label={"Password"}
                type={"password"}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Sign in" : "Register"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "New to Notflix?"
                : "Already have an account?"}{" "}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Sign up now." : "Sign in now."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
