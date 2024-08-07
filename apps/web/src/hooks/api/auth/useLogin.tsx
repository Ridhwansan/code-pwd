"use client";

import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface LoginPayload {
  email: string;
  password: string;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      // /api/auth itu dari app
      // /login itu dari router
      await axiosInstance.post("/api/auth/login", payload);
      toast.success("login success");
    } catch (error) {
        if(error instanceof AxiosError) {
            toast.error(error.response?.data)
        }
      
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};

export default useLogin;
