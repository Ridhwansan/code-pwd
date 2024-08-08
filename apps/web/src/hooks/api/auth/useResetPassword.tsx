import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useResetPassword = () => {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const resetPassword = async (password: string, token: string) => {
    setIsloading(true);
    try {
      await axiosInstance.patch(
        "/auth/reset-password",
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Reset password success");
      router.replace("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsloading(false);
    }
  };
  return { resetPassword, isLoading };
};

export default useResetPassword;
