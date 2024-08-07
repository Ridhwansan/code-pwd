"use client";

//Formik untuk menghandle formnya seperti submit form dll, sehingga tidak perlu manual pakai use state
//sedangkan yup dan yu-password untuk memproteksi agar input sesuai dengan apa yang diinginkan

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { LoginSchema } from "./schemas/loginSchema";
import useLogin from "@/hooks/api/auth/useLogin";

const LoginPage = () => {
  const { login, isLoading } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });
  return (
    <main className="flex justify-center pt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={formik.values.email}
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {!!formik.touched.email && !!formik.errors.email ? (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              ) : (
                ""
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formik.values.password}
                  placeholder="Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {!!formik.touched.password && !!formik.errors.password ? (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
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

export default LoginPage;
