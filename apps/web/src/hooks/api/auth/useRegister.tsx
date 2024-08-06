"use client";

import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterArgs {
  name: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (payload: RegisterArgs) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/api/auth/register", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });

      alert("Register Success");
      //ini yang bikin ketika klik submit di register akan langsung masuk ke hal login
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data || "something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { register, isLoading };
};

export default useRegister;
