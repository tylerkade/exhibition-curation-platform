"use client";
// import Link from "next/link";
import React from "react";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/serverActions";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

const Login = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <>
      <div className="w-[450px] rounded-[15px] bg-gray-800 px-3 shadow-md">
        <div className="mt-2.5 flex h-[82px] w-full items-center rounded-[15px] bg-gray-900 py-[7px] pl-[14px] pr-[28px]">
          <div className="ml-[17px]">
            <h1 className="text-lg font-semibold leading-none text-white min-[420px]:text-2xl min-[420px]:leading-none">
              Welcome back!
            </h1>
          </div>
        </div>
        <form action={formAction} className="space-y-4 p-5">
          <div>
            <label htmlFor="username" className="flex gap-1 text-white">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 h-8 w-full rounded-md border p-3 focus:outline-none text-white bg-gray-700 
              placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <button
            type="submit"
            aria-disabled={isPending}
            className="cursor-pointer flex h-[36px] w-full items-center justify-center rounded-lg py-2 shadow focus:outline-none 
            bg-blue-500 hover:bg-blue-700 text-white"
          >
            Log in
          </button>
          <div
            className="flex items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </form>
        <div className="pb-10">
          <div className="text-center text-sm text-white">
            Default usernames:
            <div className="mt-2 space-y-1">
              <p>
                <strong className="text-gray-400">ThisIsAUsername</strong>
              </p>
              <p>
                <strong className="text-gray-400">EmptyUser</strong>
              </p>
            </div>
          </div>

          {/* <p className="text-center text-sm text-gray-600">
            Don{`'`}t have an account?
            <Link href="/signup" className="text-blue-500 hover:underline">
              <span className="font-bold">Sign up today!</span>
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Login;
