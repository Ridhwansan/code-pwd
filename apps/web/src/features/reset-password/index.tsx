"use client";

//Formik untuk menghandle formnya seperti submit form dll, sehingga tidak perlu manual pakai use state
//sedangkan yup dan yu-password untuk memproteksi agar input sesuai dengan apa yang diinginkan

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import useLogin from "@/hooks/api/auth/useLogin";
import { ResetPasswordSchema } from "./schemas/resetPasswordSchema";
import { FC } from "react";
import useResetPassword from "@/hooks/api/auth/useResetPassword";

interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  const { resetPassword, isLoading } = useResetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      await resetPassword(values.password, token);
      resetForm();
    },
  });
  return (
    <main className="flex justify-center pt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formik.values.password}
                  placeholder="Your new Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {!!formik.touched.password && !!formik.errors.password ? (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              ) : (
                ""
              )}

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  placeholder="Your new Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {!!formik.touched.confirmPassword &&
              !!formik.errors.confirmPassword ? (
                <p className="text-xs text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              ) : (
                ""
              )}
            </div>
            {/* ditaro disini */}
            {/* ini maksudnya kalau loading nanti buttonnya akan ke disable */}
            <Button className="mt-6 w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ResetPasswordPage;
