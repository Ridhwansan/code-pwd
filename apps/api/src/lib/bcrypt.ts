import { compare, hash } from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await hash(password, saltRounds);
};

export const comparePassword = async (
  candidatePassword: string,
  hashedPassword: string
) => {
  return await compare(candidatePassword, hashedPassword);
};
