import ResetPasswordPage from "@/features/reset-password";
import React from "react";

const resetPassword = ({ params }: { params: { token: string } }) => {
  return (
    <div>
      <ResetPasswordPage token={params.token} />
    </div>
  );
};

export default resetPassword;
