"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  //dalam redux, useAppSelector digunakan untuk membaca data
  const { name, id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <nav className="sticky top-0 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="item-center flex justify-between py-2">
          <h1 className="text-lg font-bold text-red-400">Logo</h1>

          <div className="flex cursor-pointer items-center gap-8 font-medium">
            <h3>Home</h3>
            <h3>Write</h3>
            <h3>Profile</h3>
            {id ? (
              <>
                <Link href="/profile">{name}</Link>
                <h3 onClick={() => dispatch(logoutAction())}>Logout</h3>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
