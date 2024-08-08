"use client";

import useAxios from "@/hooks/useAxios";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface LoginPayload {
  email: string;
  password: string;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { axiosInstance } = useAxios();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", payload);
      dispatch(loginAction(data));
      // /api/auth itu dari app
      // /login itu dari router
      await axiosInstance.post("/auth/login", payload);
      toast.success("login success");

      //ini untuk ketika sudah login dia akan masuk ke halaman localhost3000/
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};

export default useLogin;
